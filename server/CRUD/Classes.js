module.exports = function(app){

/*********************************************
*                CLASSES                     *
*********************************************/

app.get('/api/classes', (req, res) => {
  knex('class')
    .orderBy(['dept', 'number'])
    .then(data => res.status(200).json(data))
    .catch(err => {throw Error(err)})
})

/*
SELECT *
  FROM class
  ORDER BY dept, number;
*/

app.get('/api/classes/:id', (req, res) => {
  knex('class')
    .where('id', req.params.id)
    .then(data => res.status(200).json(data))
    .catch(err => {throw Error(err)})
})

/*
SELECT *
  FROM class c
  WHERE c.id = 1;
*/

app.patch('/api/classes/:id', (req, res) => {
  
  let key = (Object.keys(req.body))[0];
  let newValue = {};
  newValue[key] = req.body[key];
  
  console.log({newValue});
  knex('class')
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
UPDATE class
  SET dept = 'NEW DEPT'
  WHERE id = 1;
*/

app.delete('/api/classes/:id', (req, res) => {
  console.log(req.params.id);
  knex('class')
    .where('id',req.params.id)
    .del()
    .then(() => {
      knex
        .select('*')
        .from('class')
        .then( (data) => {
          res.status(200).json(data);
        })
    })
    .catch(err => {throw Error(err)}) 
});

/*
DELETE
  FROM class c
  WHERE c.id = 1;
*/

app.post('/api/classes', (req, res) => {
  const {dept, number} = req.body;
  knex('class')
    .insert({dept: dept, number: number})
    .then(() => {
      console.log("sucess!")
      res.status(201).send({dept: dept, number: number});
    })
    .catch((err) => {
      console.error(err);
      return res.json({success: false, message: 'An error occurred, please try again later.', error: err});
    });
});

/*
INSERT
  INTO class (dept, number)
  VALUES ('NEW DEPT', 999);
*/}