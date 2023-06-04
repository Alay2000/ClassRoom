const BaseModel = require('./BaseModel');

class Users extends BaseModel {
    table_name = 'users'
    constructor(attrs) {
        super();
        this.id = attrs?.id;
        this.name = attrs?.name;
        this.gender = attrs?.gender;
        this.category = attrs?.category;
        this.mobile = attrs?.mobile;
        this.address = attrs?.address;
        this.date_of_joining = attrs?.date_of_joining;
        this.is_active = attrs?.is_active;
    }
}

module.exports = Users;