const connection = require('../database/connection');

module.exports =
{
    async createRating(comment, ratingValue, featureVersion, username, userId, featureId) {

        const created = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }).replace(',', '');

        const result = await connection("rating").returning('id').insert({ comment, ratingValue, featureVersion, username, userId, featureId, created });
        return result[0];
    },

    async getAllRating() {

        const ratings = await connection("rating").select("*");
        return ratings;
    },

    async getRatingsByFeature(featureId) {
        const ratings = await connection("rating").where('featureId', featureId).select("*");
        return ratings;
    },

    async getRatingById(id) {
        const rating = await connection("rating").where('id', id).select("*").first();
        return rating;
    },

    async getRatingByUserId(userId) {
        const ratings = await connection("rating").where('userId', userId).select("*");
        return ratings;
    },

    async deleteRating(id) {
        await connection("rating").where('id', id).delete();
    }

}