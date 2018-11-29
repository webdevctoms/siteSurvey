require('dotenv').config();
const express = require('express');
const {PORT,DATABASE_URL} = require('./config');
const mongoose = require('mongoose');
const passport = require('passport');
const morgan = require('morgan');
const {router: userRouter} = require('./users/router');
const {localStrategy, jwtStrategy} = require('./auth/strategies');
const {router: authRouter} = require('./auth/router');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
mongoose.Promise = global.Promise;

const app = express();
app.use(morgan('common'));
app.use(jsonParser);
app.use(express.static('public'));
passport.use(localStrategy);
passport.use(jwtStrategy);
app.use("/api/users",userRouter);
app.use('/api/auth/', authRouter);

let server;

function runServer(databaseUrl, port = PORT) {

  return new Promise((resolve, reject) => {
  	
    mongoose.connect(databaseUrl,{ useNewUrlParser: true }, err => {
      if (err) {
        return reject(err);
      }
      
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };