const connection = require('../database/connection');

module.exports =
{
    async getAllSystems() {

        const features = await connection("system").select("*");
        return features;
    },

    async getSystemById(id) {
        const system = await connection("system").where('id', id).select("*").first();
        return system;
    },

    async deleteSystem(id) {
        await connection("system").where('id', id).delete();
    },

    async createSystem(name, id) {

        const created = new Date().toLocaleString('pt-BR', {
            timeZone: 'America/Sao_Paulo'
        }).replace(',', '');

        const result = await connection("system").returning('id').insert({ name, created, id });
        return result[0];

    },
}