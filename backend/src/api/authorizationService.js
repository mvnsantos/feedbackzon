const { JsonWebTokenError } = require("jsonwebtoken");
const jwt = require('jsonwebtoken');
const { ErrorObj, ErrorCode } = require('../config/errorObj');
const applicationUserRepository = require("../repository/applicationUserRepository");
const featureRepository = require("../repository/featureRepository");
const { EnumRoles } = require('../config/enumRoles');

function generateToken(payload) {
    const secretKey = process.env.ENV_APP_SECRETKEY || "sdhfjksdf1892789asdasd!&*(hjkas!&*(@";
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60), //1 hora
        data: payload
    }, secretKey);
}

module.exports =
{
    async authorization(request, response) {
        try {
            const { application, password, featureId, userId, username, featureVersion, ratingQuestion, ratingOpenQuestion } = request.body;

            var result = await applicationUserRepository.getUserByName(application);

            if (result != null) {
                var isValidPassword = password === result.password;
                if (isValidPassword) {

                    if (result.role == EnumRoles.APPLICATION) {

                        if (featureId == null)
                            return response.status(400).json(new ErrorObj(ErrorCode.VALIDATION_ERROR, "Informe a funcionalidade"));

                        if (username == null)
                            return response.status(400).json(new ErrorObj(ErrorCode.VALIDATION_ERROR, "Informe o nome do usuário"));

                        if (userId == null)
                            return response.status(400).json(new ErrorObj(ErrorCode.VALIDATION_ERROR, "Informe o usuário"));

                        var feature = await featureRepository.getFeatureById(featureId);

                        if (feature == null)
                            return response.status(400).json(new ErrorObj(ErrorCode.REGISTER_NOT_FOUND, "Funcionalidade não encontrada"));
                    }

                    var payload =
                    {
                        role: result.role,
                        featureId: featureId,
                        userId: userId,
                        username: username,
                        featureVersion: featureVersion,
                        ratingQuestion: ratingQuestion,
                        ratingOpenQuestion: ratingOpenQuestion
                    }

                    return response.status(202).json({ token: generateToken(payload) });
                }
                else {
                    return response.status(401).json(new ErrorObj(ErrorCode.AUTH_ERROR, "Usuário ou senha inválido"));
                }
            }
            else
                return response.status(401).json(new ErrorObj(ErrorCode.AUTH_ERROR, "Usuário ou senha inválido"));

        }

        catch (e) {
            return response.status(500).json(new ErrorObj(ErrorCode.UNKNOWN, e.message, e));
        }
    }

}