require('dotenv').config();
const jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {

    if (req.metod === "OPTIONS" ) {
        next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(403).json({message: "Користувач не авторизований"})
        }
       const decodedData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
       req.user = decodedData
       next()
    }
    catch(e) {
        console.log(e)
        return res.status(403).json({message: "Користувач не авторизований"})
    }

}