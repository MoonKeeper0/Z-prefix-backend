module.exports = function(app){
/*********************************************
*               STUDENTS                     *
*********************************************/

app.get('/api/students', (req, res) => {
  knex('student')
    .orderBy(['rank', 'last', 'first'])
    .then(data => res.status(200).json(data))
    .catch(err => {throw Error(err)})
})

/*
SELECT *
  FROM student
  ORDER BY rank, last, first;
*/

app.get('/api/students/:id', (req, res) => {
  console.log(req.params.id);
  knex('student')
    .where({id: req.params.id})
    .then(data => res.status(200).json(data))
    .catch(err => {throw Error(err)}) 
})

/*
SELECT *
  FROM student s
  WHERE s.id = 1;
*/

app.patch('/api/students/:id', (req, res) => {
  let key = (Object.keys(req.body))[0];
  let newValue = {};
  newValue[key] = req.body[key];
  
  console.log({newValue});
  knex('student')
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
UPDATE student
  SET last = 'LastName'
  WHERE id = 1;
*/

app.delete('/api/students/:id', (req, res) => {
  console.log(req.params.id);
  knex('student')
    .where('id',req.params.id)
    .del()
    .then(() => {
      knex('student')
        .then( (data) => {
          res.status(200).json(data);
        })
    })
    .catch(err => {throw Error(err)}) 
});

/*
DELETE
  FROM student s
  WHERE s.id = 1;
*/

app.post('/api/students', (req, res) => {
  const {rank, first, last, email, phone_cell} = req.body;
  knex('student')
    .insert({rank: rank, first: first, last: last, email: email, phone_cell: phone_cell})
    .then(() => {
      console.log("sucess!")
      res.status(201).send({rank: rank, first: first, last: last, email: email, phone_cell: phone_cell});
    })
    .catch((err) => {
      console.error(err);
      return res.json({success: false, message: 'An error occurred, please try again later.', error: err});
    });
});
}