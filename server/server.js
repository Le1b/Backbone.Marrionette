'use strict';

var express        = require('express'),
    favicon        = require('serve-favicon'),
    path           = require('path'),
    morgan         = require('morgan'),
    log            = require('./libs/log')(module),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    config         = require('./libs/config'),
    app            = express();


app.use(favicon(__dirname + '/images/favicon.ico'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/api/things', function (req, res) {
  return res.send({
    method: 'get'
  });
});

app.post('/api/things', function (req, res) {
  return res.send({method: 'POST'});
});

app.get('/api/things/:id', function (req, res) {
  return res.send({
    method: 'get'
  });
});

app.put('/api/things/:id', function (req, res) {
  return res.send({
    method: 'PUT'
  });
});

app.delete('/api/things/:id', function (req, res) {
  return res.send({
    method: 'delete'
  });
});

app.use(function (req, res, next) {
  res.status(404);
  log.debug('Not found URL: %s', req.url);
  res.send({error: 'Not found'});
  return;
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  log.error('Internal error(%d): %s', res.statusCode, err.message);
  res.send({error: err.message});
  return;
});

app.listen(config.get('port'), config.get('host'), function () {
  log.info('Express server is listening on: %s:%s', config.get('host'), config.get('port'));
});