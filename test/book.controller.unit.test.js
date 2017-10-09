import 'babel-polyfill'
import 'should'
import sinon from 'sinon'
import booksController from '../controllers/books.controller'
import bookController from '../controllers/book.controller'


describe('Book controller tests: ', () => {
  describe('post', () => {
    it('Should not allow and empty title', () => {
      const req = {
        body:
          {
            author: 'Oleg'
          }
      };
      const res = {
        status: sinon.spy(),
        send: sinon.spy()
      };
      booksController.post(req, res);
      res.status.calledWith(400).should.equal(true, `Bad status ${res.status.args[0][0]}`);
      res.send.calledWith('Title is required').should.equal(true);
    });
    it ('Should save a book with author & title', () => {
      const Book = (book) => {
        this.save = () => {}
      };
      const book = {
        _id: '',
        author: 'Oleg',
        title: 'My Title',
        read: false
      };
      const req = {
        body:
          {
            author: 'Oleg',
            title: 'My Title'
          }
      };
      const res = {
        status: sinon.spy(),
        json: sinon.spy()
      };
      booksController.post(req, res);
      // bookController.saveBook(req, res);

      // console.log('res.status.args', res.status.args);
      res.status.calledWith(201).should.equal(true);

      res.json.calledWith(book).should.equal(true);
    })
  })
});