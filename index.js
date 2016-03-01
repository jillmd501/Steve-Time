const express = require('express');
const app = express();
const path = require('path');const bodyParser = require('body-parser');
const generateId = require('./lib/generate-id');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.locals.pizzas = {};

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Steve Time';

app.use(express.static('static'));
app.set('view engine', 'jade');

app.get('/', (request, response) => {
  response.render('index');
});

app.get('/pizzas/:id', (request, response) => {
  var pizza = app.locals.pizzas[request.params.id];

  response.render('pizza', { pizza: pizza });
});

app.post('/pizzas', (request, response) => {
  if (!request.body.pizza) { return response.sendStatus(400); }

  var id = generateId();

  app.locals.pizzas[id] = request.body.pizza;

  response.redirect('/pizzas/' + id);
});

if (!module.parent) {
 app.listen(app.get('port'), () => {
   console.log(`${app.locals.title} is running on ${app.get('port')}.`);
 });
}

module.exports = app;
