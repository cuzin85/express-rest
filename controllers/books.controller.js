
import BookModel from '../models/book.model';
import Book from './book.controller';

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
      let fullBooks = [];
      books.forEach((el, i, arr)=>{
        let newBook = el.toJSON();
        let selfLink = `http://${req.headers.host}/api/books/${newBook._id}`;
        newBook.links = {
          self: selfLink
        };
        fullBooks.push(newBook);
      });
      res.json(fullBooks);
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