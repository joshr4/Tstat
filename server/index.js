const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8080 //|| process.env.PORT;

module.exports = app;

console.log('TESTING')

app.listen(PORT, () => console.log(`Change the temp on port ${PORT}`));

// logging middleware
app.use(morgan('dev'));

// static middleware
app.use(express.static(path.join(__dirname, '..', 'node_modules')));
app.use(express.static(path.join(__dirname, '..', 'public')));

// body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 'API' routes
app.use('/api', require('./api'));

// 404 middleware
app.use((req, res, next) =>
  path.extname(req.path).length > 0 ?
    res.status(404).send('Not found') :
    next()
);

// send index.html
app.use('*', (req, res, next) =>
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
);

// error handling endware
app.use((err, req, res, next) =>
  res.status(err.status || 500).send(err.message || 'Internal server error.')
);
