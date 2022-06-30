
const server = require('./app');
require('dotenv').config();
const port = process.env.PORT || 8081;


server.listen(port, () => console.log(`Listening on port ${port}.`))
