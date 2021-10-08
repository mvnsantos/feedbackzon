
exports.up = function (knex) {
    return knex.schema.createTable("feature", function (table) {
        table.integer("id").primary().unsigned();

        table.string("name").notNullable();
        table.integer("systemId").notNullable();
        table.datetime("created").notNullable();//.defaultTo(knex.fn.now());

        table.foreign("systemId").references("id").inTable("system");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("feature");
};
