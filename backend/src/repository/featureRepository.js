const connection = require('../database/connection');

module.exports =
{
    async getFeatureById(id) {
        const feature = await connection("feature").where('id', id).select("*").first();
        return feature;
    },

    async getFeatureBySystem(systemId) {
        const features = await connection("feature").where('systemId', systemId).select("*");
        return features
    },

    async createFeature(name, systemId, id) {
        const created = new Date().toLocaleString('pt-BR', {
            timeZone: 'America/Sao_Paulo'
        }).replace(',', '');

        const result = await connection("feature").returning('id').insert({ name, systemId, created, id });

        return result[0];
    },

    async getAllFeatures() {

        const features = await connection("feature").select("*");
        return features;
    },

    async deleteFeature(id) {
        await connection("feature").where('id', id).delete();
    },

}