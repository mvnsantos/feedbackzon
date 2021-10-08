const { EnumRoles } = require('./config/enumRoles');
const jwt = require('jsonwebtoken');

module.exports = authorize;

function authorize(roles = []) {
    if (typeof roles === 'string')
        roles = [roles];

    return [
        (req, res, next) => {

            var authorization = req.headers.authorization;
            const authorizationParts = authorization.split(' ');
            const [schema, token] = authorizationParts;
            const { data } = jwt.decode(token);

            if (data.role != EnumRoles.ADMINISTRATOR) {
                if (roles.length && !roles.includes(data.role))
                    return res.status(401).json();
            }

            next();
        }

    ];

}