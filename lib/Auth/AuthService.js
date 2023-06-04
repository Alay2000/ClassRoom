const jwt = require('jsonwebtoken');
const config = require('../../config/config.json');
const Users = require('../../Models/Users');
const _ = require('lodash');
class AuthService {

    /**
     * 
     * @param {{username: string, password: string, category: string}} user_details 
     * @returns {string}
     */
    getJWTToken(user_details) {
        const { id, user_name, password, category } = user_details;
        return jwt.sign({ id, user_name, password, category }, config.JWT_SECRET_KEY);
    }

    /**
     * 
     * @param {{username: string, password: string}} req_body 
     * @returns {Promise<string>}
     */
    async verifyCredentials(req_body) {
        const { user_name, password } = req_body;
        const user_obj = new Users();
        const user_details = await user_obj.getBy({ user_name, password });
        if (!user_details.length) {
            throw new Error('Invalid Credentials');
        } else {
            return this.getJWTToken(user_details[0]);
        }
    }

    /**
     * 
     * @param {{url: string: headers: Object}} req 
     * @returns {boolean}
     */
    verifyToken(req) {
        if (req.url === '/login') return true;
        const token = req.headers?.authorization?.split(' ')?.[1];
        if (token) {
            const jwt_payload = jwt.verify(token, config.JWT_SECRET_KEY, { complete: false });
            if (jwt_payload.id && jwt_payload.user_name && jwt_payload.password && jwt_payload.category) {
                req.user = { id: jwt_payload.id, user_name: jwt_payload.user_name, category: jwt_payload.category };
                return true;
            }
        }
        return false;
    }
}
module.exports = AuthService;