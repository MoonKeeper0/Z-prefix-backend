module.exports = function(app) {
  app.delete('/api/rooms/:id', (req, res) => {
  console.log(req.params.id);
  knex('room')
    .where('id',req.params.id)
    .del()
    .then(() => {
      knex('room')
        .then( (data) => {
          res.status(200).json(data);
        })
    })
    .catch(err => {throw Error(err)}) 
  });
  
  /*
  DELETE
    FROM room r
    WHERE r.id = 1;
  
  SELECT *
    FROM room;
  */
  
  app.post('/api/rooms', (req, res) => {
  const {bldg, room, capacity, phone} = req.body;
  knex('room')
    .insert({
      bldg: bldg, 
      room: room, 
      capacity: capacity, 
      phone: phone
    })
    .then(() => {
      res.status(201).send({bldg: bldg, 
        room: room, 
        capacity: capacity, 
        phone: phone});
    })
    .catch((err) => {
      console.error(err);
      return res.json({success: false, message: 'An error occurred, please try again later.', error: err});
    });
  });
  
  /*
  INSERT
    INTO room (bldg, room, capacity, phone)
    VALUES ('1', '2', '3', '1234567890');
  */
  
  app.get('/api/rooms', (req, res) => {
    knex('room')
      .orderBy(['bldg', 'room'])
      .then(data => res.status(200).json(data))
      .catch(err => {throw Error(err)})
  })
  
  /*
  SELECT *
    FROM room
    ORDER BY bldg, room;
  */
  
  app.patch('/api/rooms/:id', (req, res) => {
    
    let key = (Object.keys(req.body))[0];
    let newValue = {};
    newValue[key] = req.body[key];
    
    console.log({newValue});
    knex('room')
      .where('id',req.params.id)
      .update(newValue)
      .then(() => {
        knex
          .select('*')
          .from('room')
          .then( (data) => {
            res.status(200).json(data);
          })
        console.log("sucess! Updated rooms")
      })
      .catch((err) => {
        console.error(err);
        return res.json({success: false, message: `An error occurred, please try again later.`, error: err});
      });
  });
  
  }