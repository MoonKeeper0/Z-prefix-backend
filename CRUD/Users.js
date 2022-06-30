module.exports = function(app){

    /*********************************************
    *                Users                       *
    *********************************************/
    
    app.get('/api/users', (req, res) => {
      knex('user')
        .orderBy(['name'])
        .then(data => res.status(200).json(data))
        .catch(err => {throw Error(err)})
    })
    
    /*
    SELECT *
      FROM class
      ORDER BY dept, number;
    */
    
    app.get('/api/users/:id', (req, res) => {
      knex('user')
        .where('id', req.params.id)
        .then(data => res.status(200).json(data))
        .catch(err => {throw Error(err)})
    })
    
    /*
    SELECT *
      FROM class c
      WHERE c.id = 1;
    */
}