
exports.up = function (knex) {
    return knex.schema.createTable("system", function (table) {
        table.integer("id").primary().unsigned();

        table.string("name").notNullable();
        table.datetime("created").notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('system');
};
