import express from 'express';
import BooksController from '../controllers/books.controller'
import BookController from '../controllers/book.controller'

export const booksRouter = express.Router();

/*booksRouter.use('/:id', (req, res, next)=> {
  BookController.getBook(req, res, next);
});*/
booksRouter.route('/')
  .get((req, res) => {
    BooksController.get(req, res);
  })
  .post((req, res) => {
    BooksController.post(req, res);
  });


booksRouter.route('/:id')
  .all((req, res, next) => {
    BookController.getBook(req, res, next);
  })
  .get((req, res) => {
    BookController.get(req, res);
  })
  .put((req, res) => {
    BookController.put(req, res);
  })
  .patch((req, res) => {
    BookController.patch(req, res);
  })
  .delete((req, res) => {
    BookController.remove(req, res);
  });
