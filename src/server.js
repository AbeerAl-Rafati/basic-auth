'use strict';
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();


const userRouter = require('./routes/user');
const notFoundHandler = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api/v1/auth', userRouter);


app.get('/', (req, res) => {
  res.send('Hello world');
});

app.use('/bad', (res, req) => {
  throw new Error();
});

app.use('*', notFoundHandler);
app.use(errorHandler);
module.exports = {
  app,
  start: (port) => {
    app.listen(port, () => console.log(`up and running on ${port}`));
  },
};
