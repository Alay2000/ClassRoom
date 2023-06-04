const constants = require('../utils/constants');
function checkTutorAction(user) {
    if (user.category !== constants.USER_CATEGORY.TUTOR) {
        throw new Error('Action only allowed for tutors');
    }
}

module.exports = { checkTutorAction };