
exports.up = function (knex) {
    return knex.schema.createTable("rating", function (table) {
        table.increments("id").primary();

        table.text("comment").nullable();
        table.string("ratingValue").notNullable();
        table.string("featureVersion").nullable();
        table.string("username").nullable();
        table.string("userId").notNullable();
        table.integer("featureId").notNullable();
        table.datetime("created").notNullable();//.defaultTo(knex.fn.now());

        table.foreign("featureId").references("id").inTable("feature");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('rating');
};
