const systemRepository = require("../repository/systemRepository");
const featureRepository = require("../repository/featureRepository");
const { ErrorObj, ErrorCode } = require('../config/errorObj');

module.exports =
{
    async createSystem(request, response) {
        try {
            const { name, id } = request.body;
            const system = await systemRepository.createSystem(name, id);

            return response.json(system);
        }
        catch (e) {
            return response.status(500).json(new ErrorObj(ErrorCode.UNKNOWN, e.message, e));
        }
    },

    async getAllSystems(request, response) {
        try {

            var systems = await systemRepository.getAllSystems();
            return response.json(systems);
        }
        catch (e) {
            return response.status(500).json(new ErrorObj(ErrorCode.UNKNOWN, e.message, e));
        }
    },

    async getSystemById(request, response) {
        try {
            const { id } = request.params;

            const system = await systemRepository.getSystemById(id);

            if (system == null)
                return response.status(400).json(new ErrorObj(ErrorCode.REGISTER_NOT_FOUND, "Sistema não encontrado"));

            return response.json(system);
        }
        catch (e) {
            return response.status(500).json(new ErrorObj(ErrorCode.UNKNOWN, e.message, e));
        }

    },

    async deleteSystem(request, response) {
        try {
            const { id } = request.params;
            const system = await systemRepository.getSystemById(id);

            if (system == null)
                return response.status(400).json(new ErrorObj(ErrorCode.REGISTER_NOT_FOUND, "Sistema não encontrado"));

            var features = await featureRepository.getFeatureBySystem(id);

            if (features != null && features.length > 0)
                return response.status(400).json(new ErrorObj(ErrorCode.DATABASE_RELANTIONSHIP_ERROR, "Existem funcionalidades vinculadas. Remova primeiramente as funcionalidades"));

            await systemRepository.deleteSystem(id);
            return response.status(204).send();
        }
        catch (e) {
            return response.status(500).json(new ErrorObj(ErrorCode.UNKNOWN, e.message, e));
        }
    },

    async getFeatureById(request, response) {
        try {
            const { id } = request.params;
            const feature = await featureRepository.getFeatureById(id);

            if (feature == null)
                return response.status(400).json(new ErrorObj(ErrorCode.REGISTER_NOT_FOUND, "Funcionalidade não encontrada"));

            return response.json(feature);
        }
        catch (e) {
            return response.status(500).json(new ErrorObj(ErrorCode.UNKNOWN, e.message, e));
        }

    },

    async getFeatureBySystem(request, response) {
        try {
            const { systemId } = request.params;
            const features = await featureRepository.getFeatureBySystem(systemId);
            return response.json(features);
        }
        catch (e) {
            return response.status(500).json(new ErrorObj(ErrorCode.UNKNOWN, e.message, e));
        }
    },

    async createFeature(request, response) {
        try {
            const { name, systemId, id } = request.body;

            const system = await systemRepository.getSystemById(systemId);

            if (system == null)
                return response.status(400).json(new ErrorObj(ErrorCode.REGISTER_NOT_FOUND, "Sistema não encontrado"));

            const feature = await featureRepository.createFeature(name, systemId, id);

            return response.json({ feature });
        }
        catch (e) {
            return response.status(500).json(new ErrorObj(ErrorCode.UNKNOWN, e.message, e));
        }
    },

    async getAllFeatures(request, response) {
        try {
            const features = await featureRepository.getAllFeatures();
            return response.json(features);
        }
        catch (e) {
            return response.status(500).json(new ErrorObj(ErrorCode.UNKNOWN, e.message, e));
        }
    },

    async deleteFeature(request, response) {
        try {
            const { id } = request.params;

            const feature = await featureRepository.getFeatureById(id);

            if (feature == null)
                return response.status(400).json(new ErrorObj(ErrorCode.REGISTER_NOT_FOUND, "Funcionalidade não encontrada"));

            await featureRepository.deleteFeature(feature.id);
            return response.status(204).send();
        }
        catch (e) {
            return response.status(500).json(new ErrorObj(ErrorCode.UNKNOWN, e.message, e));
        }

    },

}