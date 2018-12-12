const express = require('express');
const bodyParser = require('body-parser');

const { rando } = require('./utils');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

let puppies = [];

const puppiesRouter = new express.Router();

puppiesRouter.get('/', (req, res) => {
  res.json(puppies);
});

puppiesRouter.post('/', (req, res) => {
  const id = rando();
  const { name, imgUrl } = req.body;
  const newPuppy = {
    id, name, imgUrl,
  };
  puppies.push(newPuppy);
  res.status(201).json(newPuppy);
});

puppiesRouter.use('/:id', (req, res, next) => {
  const puppy = puppies.find(p => p.id === req.params.id);
  if (puppy) {
    req.puppy = puppy;
    next();
  } else {
    res.sendStatus(404);
  }
});

puppiesRouter.get('/:id', (req, res) => {
  res.json(req.puppy);
});

puppiesRouter.patch('/:id', (req, res) => {
  Object.assign(req.puppy, req.body);
  res.status(202).json(req.puppy);
});

puppiesRouter.delete('/:id', (req, res) => {
  puppies = puppies.filter(p => p.id !== req.params.id);
  res.status(202).json(req.puppy);
});

app.use('/api/puppies', puppiesRouter);

app.listen(3000, () => {
  console.log('Listening on 3000');
});
