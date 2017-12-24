const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(function(req, res, next) {
  console.log(`${req.method} request for '${req.url}' - ${JSON.stringify(req.body)}`);
  next();
});
app.use(cors());

require('./app/index')(app, {});

const port = 8000;

app.listen(process.env.PORT || port, function() {
  console.log('Express server listening on port %d in %s mode', process.env.PORT || port);
});