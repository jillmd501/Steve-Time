const express = require('express');
const app = express();
const path = require('path');const bodyParser = require('body-parser');
const generateId = require('./lib/generate-id');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.locals.polls = {};

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Steve Time';

app.use(express.static('static'));
app.set('view engine', 'jade');

app.get('/', (request, response) => {
  response.render('index');
});

app.get('/polls/:id', (request, response) => {
  var poll = app.locals.polls[request.params.id];

  response.render('poll', { poll: poll });
});

app.post('/polls', (request, response) => {
  if (!request.body.poll) { return response.sendStatus(400); }

  var id = generateId();

  app.locals.polls[id] = request.body.poll;

  response.redirect('/polls/' + id);
});

if (!module.parent) {
 app.listen(app.get('port'), () => {
   console.log(`${app.locals.title} is running on ${app.get('port')}.`);
 });
}

module.exports = app;
