import BookModel from '../models/book.model';

function getBook(req, res, next) {
  BookModel.findById(req.params.id, (err, book) => {
    if (err) {
      res.status(500).send(err)
    } else if (book) {
      req.book = book;
      next();
    } else {
      res.status(404).send('No book found');
    }
  });
}

function get(req, res) {
  res.json(req.book.toJSON());

}

function put(req, res) {
  const book = req.book;
  book.title = req.body.title;
  book.author = req.body.author;
  book.read = req.body.read;
  book.genre = req.body.genre;
  saveBook(req, res);
}

function patch(req, res) {
  if (req.book._id) delete req.book._id;
  for (let key in req.body) req.book[key] = req.body[key];
  saveBook(req, res);
}

function remove(req, res) {
  req.book.remove()
    .then((book) => {
      console.log("Removed book:", book);
      res.status(200).send('Book removed');
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
}

function saveBook(req, res) {
  req.book.save()
    .then((book) => {
      res.status(201);
      res.send(book);
    })
    .catch((err) => {
      res.status(400).send(err.message);
    });
}

export default {getBook, saveBook, get, put, patch, remove}