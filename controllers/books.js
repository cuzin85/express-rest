
import BookModel from '../models/book';
import Book from './book';

function get(req, res) {
  const filtersArr = ["author", "genre", "title"];
  const query = {};
  for (let i = 0; i < filtersArr.length; i++) {
    let filter = filtersArr[i];
    if (req.query[filter]) {
      query[filter] = req.query[filter];
    }
  }
  console.log("query:", query);
  BookModel.find(query, (err, books) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.json(books);
    }
  });
  // res.send('Hello from books!')
}

function post(req, res) {
  let book = new BookModel(req.body);
  req.book = book;
  Book.saveBook(req, res);
}

export default {get, post}