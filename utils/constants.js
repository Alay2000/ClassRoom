module.exports = {
    USER_ATTRS: ['name', 'gender', 'mobile', 'address', 'date_of_joining', 'user_name', 'password'],
    USER_CATEGORY: {
        TUTOR: 'tutor',
        STUDENT: 'student',
    },
    FILE_INSERT_ATTRS: ['classroom_id', 'name', 'description', 'type', 'url'],
    FILE_UPDATE_ATTRS: ['name', 'description', 'is_active', 'url', 'type'],
    CLASS_INSERT_ATTRS: ['tutor_id', 'title'],
}