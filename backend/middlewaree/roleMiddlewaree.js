require('dotenv').config();
const jwt = require('jsonwebtoken')

module.exports = function (roles) {
    return function (req, res, next) {

        if (req.metod === "OPTIONS" ) {
            next()
        }
        
        try {
            const authorizationHeader = req.headers.authorization;
            if (!authorizationHeader) {
                return res.status(403).json({ message: "Користувач не авторизований" });
            }
            const token = req.headers.authorization.split(' ')[1]
            const {roles: userRole} = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            let hasRole = false;
            userRole.forEach(role => {
                if(roles.includes(role)) {
                    hasRole = true;
                }
            });

            if (!hasRole) {
                return res.status(403).json({message: "Немає доступу"})
            }
            next()
            }
        catch(e) {
            console.log(e)
            return res.status(403).json({message: "Користувач не авторизований"})
        }
    }

}