const jwt = require('jsonwebtoken');
const { ErrorObj, ErrorCode } = require('../config/errorObj');
const { EnumRoles } = require('../config/enumRoles');
const routes = require('../routes');

module.exports = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).json(new ErrorObj(ErrorCode.AUTH_ERROR, "Token não fornecido"));

    const parts = authHeader.split(' ');

    if (!parts.length === 2)
        return res.status(401).json(new ErrorObj(ErrorCode.AUTH_ERROR, "Token inválido"));

    const [schema, token] = parts;

    if (!/^Bearer$/i.test(schema))
        return res.status(401).json(new ErrorObj(ErrorCode.AUTH_ERROR, "Token mal formatado"));

    const secretKey = process.env.ENV_APP_SECRETKEY || "sdhfjksdf1892789asdasd!&*(hjkas!&*(@";
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) return res.status(401).json(new ErrorObj(ErrorCode.AUTH_ERROR, "Token inválido", err))
        return next();
    });

};


