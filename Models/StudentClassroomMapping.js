const BaseModel = require('./BaseModel');
const db = require('../utils/database');

class StudentClassRoomMapping extends BaseModel {
    table_name = 'student_classroom_mapping'
    constructor(attrs) {
        super();
        this.id = attrs?.id;
        this.student_id = attrs?.student_id;
        this.classroom_id = attrs?.classroom_id;
        this.is_active = attrs?.is_active;
    }

    /**
     * 
     * @param {number} student_id 
     * @returns {Promise<Array<Object>>}
     */
    async getStudentClasses(student_id) {
        return db(`${this.table_name} as scm`)
            .join('users', 'users.id', 'scm.student_id')
            .join('classroom as c', 'c.id', 'scm.classroom_id')
            .select('c.id', 'c.title')
            .where('scm.student_id', student_id);
    }
}

module.exports = StudentClassRoomMapping;