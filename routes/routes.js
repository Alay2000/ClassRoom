const express = require("express");
const router = express.Router();

router.use('/', require('../lib/Auth/routes'));
router.use('/files', require('../lib/Files/routes'));
router.use('/classroom', require('../lib/Classroom/routes'));
router.use('/users', require('../lib/User/routes'));

module.exports = router;