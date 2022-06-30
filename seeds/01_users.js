/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  //await knex.schema.raw('TRUNCATE user CASCADE');
  await knex('user').del()
  await knex('user').insert([
    {id: 1, username: 'Capt', nickname: 'CaptCrunch' , password: '1'},
  {id: 2, username: 'Bob', nickname: 'bob1', password: '2'}
   
  ]);
  

  //await knex.raw('SELECT SETVAL(pg_get_serial_sequence(\'user\',\'id\'), (SELECT MAX(id) FROM user) )');

  
};
