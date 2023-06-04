const express = require("express");
const router = express.Router();
const UserService = require('./UserService');
const constants = require('../../utils/constants')

router.post('/student', async (req, res) => {
    const user_obj = new UserService(req.user);
    try {
        const result = await user_obj.addUser(req.body, constants.USER_CATEGORY.STUDENT);
        res.send({ id: result });
    } catch (error) {
        res.send(error.message);
    }
});

router.post('/tutor', async (req, res) => {
    const user_obj = new UserService(req.user);
    try {
        const result = await user_obj.addUser(req.body, constants.USER_CATEGORY.TUTOR);
        res.send({ id: result });
    } catch (error) {
        res.send(error.message);
    }
});

router.get('/:category', async (req, res) => {
    const user_obj = new UserService(req.user);
    try {
        const result = await user_obj.getUsers(req.params.category);
        res.send({ id: result });
    } catch (error) {
        res.send(error.message);
    }
});

module.exports = router;