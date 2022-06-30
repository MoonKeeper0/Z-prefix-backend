module.exports = function(app){
  app.get('/api/faculty/:id', (req, res) => {
  console.log(req.params.id);
  knex('faculty')
    .where({id: req.params.id})
    .then(data => res.status(200).json(data))
    .catch(err => {throw Error(err)}) 
} )

/*
SELECT *
  FROM faculty f
  WHERE f.id = 1;
*/

app.get('/api/faculty', (req, res) => {
  knex('faculty')
    .orderBy(['rank', 'last', 'first'])
    .then(data => res.status(200).json(data))
    .catch(err => {throw Error(err)})
})

/*
SELECT *
  FROM faculty
  ORDER BY rank, last, first;
*/

app.patch('/api/faculty/:id', (req, res) => {
  let key = (Object.keys(req.body))[0];
  let newValue = {};
  newValue[key] = req.body[key];
  
  console.log({newValue});
  knex('faculty')
    .where('id',req.params.id)
    .update(newValue)
    .then(() => {
      console.log("sucess!")
      res.status(201).send(
        newValue
      );
    })
    .catch((err) => {
      console.error(err);
      return res.json({success: false, message: `An error occurred, please try again later.`, error: err});
    });
});

/*
UPDATE faculty
  SET nickname = 'Instructor 1'
  WHERE id = 1;
*/

app.delete('/api/faculty/:id', (req, res) => {
  console.log(req.params.id);
  knex('faculty')
    .where('id',req.params.id)
    .del()
    .then(() => {
      knex('faculty')
        .then( (data) => {
          res.status(200).json(data);
        })
    })
    .catch(err => {throw Error(err)}) 
});

/*
DELETE
  FROM faculty f
  WHERE f.id = 1;
*/

app.post('/api/faculty', (req, res) => {
  const {rank, first, last, nickname, email, phone_work, phone_cell} = req.body;
  knex('faculty')
    .insert({rank: rank, first: first, last: last, nickname: nickname, email: email, phone_work: phone_work, phone_cell: phone_cell})
    .then(() => {
      console.log("sucess!")
      res.status(201).send({rank: rank, first: first, last: last, nickname: nickname, email: email, phone_work: phone_work, phone_cell: phone_cell});
    })
    .catch((err) => {
      console.error(err);
      return res.json({success: false, message: 'An error occurred, please try again later.', error: err});
    });
});
}