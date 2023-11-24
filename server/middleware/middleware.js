const jwt = require('jsonwebtoken')
require('dotenv').config()

const adminMiddleware = (req, resp, next) => {
    const token = req.headers.authorization
    // console.log(token)
    // console.log(process.env.SECRET_KEY)
    try {
        if (token) {
            const _id = jwt.verify(token, process.env.SECRET_KEY)
            // console.log('_id => ', _id)
            if (_id) {
                req.admin = _id
                next();
            }
        }
        else {
            console.log("Access denied")
            resp.json({ success: false, message: 'Access denied' })
        }
    }
    catch (err) {
        console.log('err in admin middleware')
        resp.json({ success: false, message: err })
    }
}

module.exports = adminMiddleware