import express from 'express';
import BookModel from '../models/book';

export const booksRouter = express.Router();

booksRouter.route('/')
  .get((req, res) => {
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
  })
  .post((req, res) => {
    if (!req.body.title || !req.body.author){
      res.status(400).send('Not enough data!');
    } else {
      let book = new BookModel(req.body);
      book.save();
      res.status(201);
      res.send(book);
    }
  });

booksRouter.route('/author/:author/:genre')
    .get((req, res) => {
        BookModel.find({author: req.params.author, genre: req.params.genre}, (err, books) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.json(books);
            }
        });
    });

/*booksRouter.route('/genre/:genre')
    .get((req, res) => {
        BookModel.find({genre: req.params.genre}, (err, books) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.json(books);
            }
        });
    });*/

booksRouter.route('/:id')
  .get((req, res) => {
    BookModel.findById(req.params.id, (err, book) => {
      if (err) {
        res.status(500).send(err)
      } else if (book) {
        res.json(book);
      } else {
        res.status(404).send('No book found');
      }
    });
    // res.send('Hello from books!')
  })
  .post((req, res) => {
    res.send('Hello from books!')
  });
