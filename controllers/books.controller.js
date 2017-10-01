
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
      const protocol = req.secure ? 'https' : 'http';
      books.forEach((el, i, arr)=>{
        let newBook = el.toJSON();

        let selfLink = `${protocol}://${req.headers.host}/api/books/${newBook._id}`;
        let authorLink = `${protocol}://${req.headers.host}/api/books?author=${newBook.author}`.replace(new RegExp(' ', 'g'), '%20');
        let genreLink = `${protocol}://${req.headers.host}/api/books?genre=${newBook.genre}`.replace(new RegExp(' ', 'g'), '%20');
        let authorAndGenreLink = `${protocol}://${req.headers.host}/api/books?author=${newBook.author}&genre=${newBook.genre}`.replace(new RegExp(' ', 'g'), '%20');
        newBook.links = { self: selfLink, author: authorLink, genre: genreLink, authorGenre: authorAndGenreLink };
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