const _ = require('lodash');
const StudentClassroomMapping = require('../../Models/StudentClassroomMapping');
const Classroom = require('../../Models/Classroom');
const { checkTutorAction } = require('../../utils/general');
const constants = require('../../utils/constants');

class ClassRoomService {

    constructor(user) {
        this.user = user;
    }

    /**
     * 
     * @param {number} user_id 
     * @param {string} category 
     * @returns {Promise<Array<Object>>}
     */
    async getClasses(user_id, category) {
        const student_class_map_obj = new StudentClassroomMapping();
        if (category === constants.USER_CATEGORY.STUDENT) {
            return student_class_map_obj.getStudentClasses(Number(user_id));
        } else {
            const classroom_obj = new Classroom();
            return classroom_obj.getBy({ tutor_id: user_id });
        }
    }

    /**
     * 
     * @param {Object} req_body 
     * @returns {Promise<number>}
     */
    async addClassroom(req_body) {
        checkTutorAction(this.user);
        const attrs = _.pick(req_body, constants.CLASS_INSERT_ATTRS);
        const classroom_obj = new Classroom();
        return classroom_obj.insert(attrs);
    }

    /**
     * 
     * @param {Object} req_body 
     */
    async addStudentsToClassroom(req_body) {
        const { student_ids, classroom_id } = req_body
        checkTutorAction(this.user);
        const insertArray = student_ids.map((id) => {
            return {
                classroom_id,
                student_id: id,
            }
        });
        const student_class_map_obj = new StudentClassroomMapping();
        await student_class_map_obj.insertAll(insertArray);
    }
}

module.exports = ClassRoomService;