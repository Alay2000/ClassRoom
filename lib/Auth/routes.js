const express = require("express");
const router = express.Router();
const Auth = require('./AuthService');

router.use('/', async (req, res, next) => {
    const auth_obj = new Auth();
    const verified = auth_obj.verifyToken(req);
    if (verified) {
        next();
    } else {
        res.send('Invalid Token', 401);
    }
});

router.post('/login', async (req, res) => {
    const auth_obj = new Auth();
    try {
        const result = await auth_obj.verifyCredentials(req.body)
        res.send(result);
    } catch (error) {
        res.send(error.message);
    }
});

module.exports = router;