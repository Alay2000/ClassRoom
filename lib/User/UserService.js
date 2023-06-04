const _ = require('lodash');
const StudentClassroomMapping = require('../../Models/StudentClassroomMapping');
const Users = require('../../Models/Users');
const constants = require('../../utils/constants');
const { checkTutorAction } = require('../../utils/general');

class UserService {
    constructor(user) {
        this.user = user;
    }

    /**
     * 
     * @param {Object} req_body 
     * @param {string} category 
     * @returns {Promise<number>}
     */
    async addUser(req_body, category) {
        const attrs = _.pick(req_body, constants.USER_ATTRS);
        attrs.category = category;
        const users_obj = new Users(attrs);
        const student_id = await users_obj.insert(attrs);
        if (category === constants.USER_CATEGORY.STUDENT) {
            checkTutorAction(this.user);
            const { classroom_id } = req_body;
            const student_class_map_obj = new StudentClassroomMapping();
            await student_class_map_obj.insert({ student_id, classroom_id });
        }
        return student_id;
    }

    async getUsers(category) {
        const users_obj = new Users();
        return users_obj.getBy({ category })
    }
}

module.exports = UserService;