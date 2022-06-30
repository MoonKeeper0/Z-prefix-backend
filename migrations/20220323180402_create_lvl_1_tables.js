/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('user', table => {
      table.increments('id');
      table.string('username', 255).notNullable();
      table.string('nickname', 255);
      table.string('password', 255);
      table.integer('posts');
    })
    
    
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('user');
    
};
