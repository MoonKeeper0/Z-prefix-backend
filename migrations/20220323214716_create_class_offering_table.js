/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function(knex) {
    return knex.schema
    .createTable('post', table => {
      table.increments('id');
      table.string('title', 255).notNullable();
      table.string('body', 255);
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.integer('id_user');
      table.foreign('id_user').references('user.id')
      //.inTable('users')
      .deferrable('deferred')
      .onDelete('SET NULL');;
          })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('post', table => {
        table.dropForeign('id_user');
    })
        .then(() => {
        return knex.schema.dropTableIfExists('post');
    })
    
};
