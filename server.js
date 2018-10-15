require('dotenv').config({path: 'variables.env'});
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const Users = require('./api/models/usersModel'); //created model loading her;
const bodyParser = require('body-parser');
const firebase = require('./firebase');

app.use('/', async (req, res, next) => {
  const errorMsg = 'You are not authorized to access this API';

  if (req.headers.authorization) {
    const result = await firebase.validateToken(req.headers.authorization);

    result ? next() : res.status(401).send({message: errorMsg});
  } else {
    res.status(401).send({message: errorMsg});
  }
});
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://mohamedabusrea:ZsL4b1ef@ds125673.mlab.com:25673/fitness-mate', {useNewUrlParser: true});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const routes = require('./api/routes/usersRoutes'); //importing route
routes(app); //register the route

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'});
});

app.listen(port);
