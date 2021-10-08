const connection = require('../database/connection');

module.exports =
{
    async getUserByName(username) {

        const user = await connection("applicationUser").where({ userName: username }).first();
        return user;
    }
}