
const express = require('express');
const app = express();
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV ||'development']);

const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({ extended: true, type: '*/x-www-form-urlencoded'}));

app.use((req, res, next) => {
    res.header({ 'Access-Control-Allow-Origin': 'http://localhost:3000' || "https://z-prefix-u.herokuapp.com/" });
    res.header({
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
    });
    res.header({
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    });
    next();
  });

/*********************************************
*                 Users                     *
*********************************************/
app.get('/', (req, res) => {
  knex('user')
  
    
    .then(data => res.status(200).json())
    .catch(err => {throw Error(err)})
})
app.get('/api/users', (req, res) => {
//knex('user').upsert('password', 1);

  knex('user')
  
    .orderBy(['id'])
    
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
  
    .where('user.id', req.params.id)
    .then(data => res.status(200).json(data))
    .catch(err => {throw Error(err)})
})

app.get('/api/users/posts/:id', (req, res) => {
  knex('user')
  .join('post', 'user.id', 'post.id_user')
  .select('post.id', 'user.username', 'post.title', 'post.body', 'post.created_at')
    .where('user.id', req.params.id)
    .then(data => res.status(200).json(data))
    .catch(err => {throw Error(err)})
})


app.post('/api/users', (req, res) => {
  const {username, nickname, password} = req.body;
  knex('user')
    .insert({username: username, nickname: nickname, password: password})
    .then(() => {
      console.log("sucess!")
      res.status(201).send({username: username, nickname: nickname, password: password});
    })
    .catch((err) => {
      console.error(err);
      return res.json({success: false, message: 'An error occurred, please try again later.', error: err});
    });
});

/*
SELECT *
  FROM class c
  WHERE c.id = 1;
*/
/*********************************************
*                 Posts                     *
*********************************************/

app.get('/api/posts', (req, res) => {
  knex('post')
  .join('user', 'user.id', 'post.id_user')
  .select('post.id', 'user.username', 'post.title', 'post.body', 'post.created_at')
  
  
  .orderBy(['id'])
    .then(data => res.status(200).json(data))
    .catch(err => {throw Error(err)})
})

/*
SELECT *
  FROM class
  ORDER BY dept, number;
*/

app.get('/api/posts/:id', (req, res) => {
  knex('post')
  .join('user', 'user.id', 'post.id_user')
  .select('post.id', 'user.username', 'post.title', 'post.body', 'post.created_at')
    .where('post.id', req.params.id)
    .then(data => res.status(200).json(data))
    .catch(err => {throw Error(err)})
})

app.post('/api/posts', (req, res) => {
  const {title, body, id_user} = req.body;
  knex('post')
    .insert({title: title, body: body, id_user: id_user})
    .then(() => {
      console.log("sucess!")
      res.status(201).send({title: title, body: body, id_user: id_user});
    })
    .catch((err) => {
      console.error(err);
      return res.json({success: false, message: 'An error occurred, please try again later.', error: err});
    });
});

app.patch('/api/posts/:id', (req, res) => {
  let key = (Object.keys(req.body))[0];
  let newValue = {};
  newValue = req.body;
  
  console.log({newValue});
  knex('post')
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

app.delete('/api/posts/:id', (req, res) => {
  console.log(req.params.id);
  knex('post')
    .where('id',req.params.id)
    .del()
    .then(() => {
      knex('post')
        .then( (data) => {
          res.status(200).json(data);
        })
    })
    .catch(err => {throw Error(err)}) 
});


/* 





SELECT s.rank, s.first, s.last, co.id AS classid, sh.day, s.date, sh.start, sh.end, c.dept, c.number, f.rank, f.last, r.bldg, r.room
  FROM semester_class sc
  LEFT JOIN class_offering co ON sc.id_class_offering = co.id
  LEFT JOIN shift sh ON co.id_shift = sh.id
  LEFT JOIN class c ON co.id_class = c.id
  RIGHT JOIN class_student cs ON sc.id = cs.id_semester_class
  LEFT JOIN student st ON cs.id_student = st.id
  RIGHT JOIN session s ON sc.id = s.id_semester_class
  LEFT JOIN faculty f ON s.id_faculty = f.id
  LEFT JOIN room r ON s.id_room = r.id
  WHERE s.id = 1
  AND s.date > '06-06-2022'
  AND s.date < '06-12-2022'
  ORDER BY s.date, sh.start
;
*/

module.exports = app;

/*
Docker initialized, connected, opened with
    docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -v <path>/sdi-blended-full-stack-project-scaffold/server/postrgres:/var/lib/postgressql/data postgres
    docker ps -a
    docker exec -it <container id> bash
    psql -U postgres
    CREATE DATABASE registrar;
*/