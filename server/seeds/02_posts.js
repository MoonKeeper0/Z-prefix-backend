/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  //await knex.schema.raw('TRUNCATE post CASCADE');
  await knex('post').del()
  await knex('post').insert([
    {title: 'Post 1', body: 'Capt made this 1', id_user: 1},
    {title: 'Post 2', body: 'Capt made this 2', id_user: 1},
    {title: 'Post 3', body: 'Bob made this   ', id_user: 2},
    {title: 'Post 4', body: 'Capt made this 3', id_user: 1},
    {title: 'Post 5', body: 'Bob made this 2', id_user: 2},
    {title: 'Kyle\'s Plight 6', body: 'When the sun sets onto the ew world I wonder sometimes what it means to be human and what imeans to be a better person. I search and I search for more answeres but I am often lost without a clear answer to questions.', id_user: 1},
    {title: 'Megaman Battle Newtwork 3', body: 'It is one the of the best Megaman games. It focuses on turnbase mechanics but leans on a user focus section. THe implementation of chips makes the game very fun but the abiility to customize your Navi in other ways allows for a large variety of techniques', id_user: 2} 
    
  ]);
};

/*
SELECT co.id, c.dept, c.number, s.day, s.start, s.end
  FROM class_offering co 
  LEFT JOIN class c ON co.id_class = c.id 
  LEFT JOIN shift s ON co.id_shift = s.id;
*/