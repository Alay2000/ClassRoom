const express = require("express");
const router = express.Router();
const FileService = require('./FileService');

router.post('/', async (req, res) => {
    const file_obj = new FileService(req.user);
    try {
        const result = await file_obj.addFile(req.body);
        res.send({ id: result });
    } catch (error) {
        res.send(error.message);
    }
});

router.patch('/:id', async (req, res) => {
    const file_obj = new FileService(req.user);
    try {
        const result = await file_obj.updateFile(req.params.id, req.body);
        res.send({ updated_records: result });
    } catch (error) {
        res.send(error.message);
    }
});

router.delete('/:id', async (req, res) => {
    const file_obj = new FileService(req.user);
    try {
        const result = await file_obj.updateFile(req.params.id, { is_active: 0 });
        res.send({ updated_records: result });
    } catch (error) {
        res.send(error.message);
    }
});

router.post('/:classroom_id', async (req, res) => {
    const file_obj = new FileService(req.user);
    try {
        const result = await file_obj.getFiles(req.params.classroom_id, req.body);
        res.send(result);
    } catch (error) {
        res.send(error.message);
    }
});

module.exports = router;