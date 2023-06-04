const _ = require('lodash');
const Files = require('../../Models/Files');
const { checkTutorAction } = require('../../utils/general');
const constants = require('../../utils/constants');

class FileService {
    constructor(user) {
        this.user = user;
    }

    /**
     * 
     * @param {Object} req_body 
     * @returns {Promise<number>}
     */
    async addFile(req_body) {
        checkTutorAction(this.user);
        const files_obj = new Files();
        const attrs = _.pick(req_body, constants.FILE_INSERT_ATTRS);
        attrs.tutor_id = this.user.id;
        return files_obj.insert(attrs);
    }

    /**
     * 
     * @param {number} id 
     * @param {Object} attrs 
     * @returns {Promise<number>}
     */
    async updateFile(id, attrs) {
        checkTutorAction(this.user);
        attrs = _.pick(attrs, constants.FILE_UPDATE_ATTRS);
        const files_obj = new Files({ id, ...attrs });
        return files_obj.update(id, attrs);
    }

    /**
    * 
    * @param {number} classroom_id 
    * @param {{file_type: Array<string>, file_name: string}} filters 
    * @returns {Promise<Array{Object}>}
    */
    async getFiles(classroom_id, filters) {
        const files_obj = new Files();
        return files_obj.getFilesForClassroom(classroom_id, filters);
    }

}
module.exports = FileService;