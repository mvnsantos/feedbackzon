const featureRepository = require("../repository/featureRepository");
const ratingRepository = require("../repository/ratingRepository");
const { ErrorObj, ErrorCode } = require('../config/errorObj');
const jwt = require('jsonwebtoken');

module.exports =
{
    async createRating(request, response) {
        try {
            const { comment, ratingValue } = request.body;
            const { authorization } = request.headers;

            const token = authorization.split(' ')[1];

            const { featureId, userId, username, featureVersion } = jwt.decode(token).data;
            const feature = await featureRepository.getFeatureById(featureId);

            if (feature == null)
                return response.status(400).json(new ErrorObj(ErrorCode.REGISTER_NOT_FOUND, "Funcionalidade não encontrada"));

            const result = await ratingRepository.createRating(comment, ratingValue, featureVersion, username, userId, featureId);
            return response.json(result);

        }
        catch (e) {
            console.log(e);
            return response.status(500).json(new ErrorObj(ErrorCode.UNKNOWN, "Erro desconhecido", "Erro desconhecido"));
        }
    },

    async getAllRatings(request, response) {
        try {
            const ratings = await ratingRepository.getAllRating();
            return response.json(ratings);
        }
        catch (e) {
            return response.status(500).json(new ErrorObj(ErrorCode.UNKNOWN, e.message, e));
        }
    },

    async getRatingsByFeature(request, response) {
        try {
            const { featureId } = request.params;

            const ratings = await ratingRepository.getRatingsByFeature(featureId);

            return response.json(ratings);
        }
        catch (e) {
            console.log(e);
            return response.status(500).json(new ErrorObj(ErrorCode.UNKNOWN, "Erro desconhecido", "Erro desconhecido"));
        }

    },

    async getRatingsByUserId(request, response) {
        try {
            const { userId } = request.params;

            const ratings = await ratingRepository.getRatingByUserId(userId);

            return response.json(ratings);
        }
        catch (e) {
            console.log(e);
            return response.status(500).json(new ErrorObj(ErrorCode.UNKNOWN, "Erro desconhecido", "Erro desconhecido"));
        }

    },

    async getRatingById(request, response) {
        try {
            const { id } = request.params;

            const rating = await ratingRepository.getRatingById(id);

            if (rating == null)
                return response.status(400).json(new ErrorObj(ErrorCode.REGISTER_NOT_FOUND, "Avaliação não encontrada"));

            return response.json(rating);
        }
        catch (e) {
            return response.status(500).json(new ErrorObj(ErrorCode.UNKNOWN, e.message, e));
        }

    },

    async deleteRating(request, response) {
        try {
            const { id } = request.params;

            const rating = await ratingRepository.getRatingById(id);

            if (rating == null)
                return response.status(400).json(new ErrorObj(ErrorCode.REGISTER_NOT_FOUND, "Avaliação não encontrada"));

            await ratingRepository.deleteRating(id);
            return response.status(204).send();
        }
        catch (e) {
            return response.status(500).json(new ErrorObj(ErrorCode.UNKNOWN, e.message, e));
        }

    }

}