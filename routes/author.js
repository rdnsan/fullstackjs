const express = require('express');
const router = express.Router();
const Author = require('../models/author');

// All Author
router.get('/', async (req, res) => {
  let searchOptions = {};

  if (req.query.name !== null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i');
  }

  try {
    const authors = await Author.find(searchOptions);
    res.render('author/index', {
      authors,
      searchOptions: req.query,
    });
  } catch {
    res.redirect('/');
  }
});

// New Author
router.get('/new', (req, res) => {
  res.render('author/new', { author: new Author() });
});

// Create Author
router.post('/', async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });

  try {
    const newAuthor = await author.save();
    // res.redirect(`author/${newAuthor.id}`);
    res.redirect('author');
  } catch {
    res.render('author/new', {
      author: author,
      errorMessage: 'Error creating Author',
    });
  }
});

module.exports = router;
