const express = require("express");
const router = express.Router();
const ClassroomService = require('./ClassroomService');

router.post('/', async (req, res) => {
    const class_obj = new ClassroomService(req.user);
    try {
        const result = await class_obj.addClassroom(req.body);
        res.send({ id: result });
    } catch (error) {
        res.send(error.message);
    }
});

router.get('/', async (req, res) => {
    const class_obj = new ClassroomService(req.user);
    try {
        const result = await class_obj.getClasses(req.user?.id, req.user?.category);
        res.send(result);
    } catch (error) {
        res.send(error.message);
    }
});

router.post('/students', async (req, res) => {
    const class_obj = new ClassroomService(req.user);
    try {
        const result = await class_obj.addStudentsToClassroom(req.body);
        res.send('Added Students to Classroom');
    } catch (error) {
        res.send(error.message);
    }
});

module.exports = router;