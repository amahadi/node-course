const jwt = require('jsonwebtoken');
const User = require('../models/user_model')
const responseBuilder = require('../utils/response_builder')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'thisismycourse');
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if(!user) { throw new Error(404) }

        req.user = user;
        req.token = token;
        next()
    } catch(e) {
        res.status(401).send({status: responseBuilder(401), additionalMessage: e.message});
    }
}

module.exports = auth;