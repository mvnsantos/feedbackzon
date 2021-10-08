const { EnumRoles } = require('../../config/enumRoles')


exports.up = function (knex) {
    return knex.schema.createTable("applicationUser", function (table) {
        table.increments("id");

        table.string("userName").notNullable();
        table.string("password").notNullable();
        table.datetime("created").notNullable();
        table.enu('role', [EnumRoles.ADMINISTRATOR, EnumRoles.APPLICATION, EnumRoles.REPORT, EnumRoles.DEVELOPER]).notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('applicationUser');
};
