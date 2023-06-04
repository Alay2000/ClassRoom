const BaseModel = require('./BaseModel');

class Classroom extends BaseModel {
    table_name = 'classroom'
    constructor(attrs) {
        super();
        this.id = attrs?.id;
        this.tutor_id = attrs?.tutor_id;
        this.title = attrs?.title;
        this.is_active = attrs?.is_active;
    }
}

module.exports = Classroom;