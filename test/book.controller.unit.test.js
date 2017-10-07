import 'babel-polyfill'
import should from 'should'
import sinon from 'sinon'
import booksController from '../controllers/books.controller'
import bookController from '../controllers/book.controller'


describe('Book controller tests: ', () => {
  describe('post', () => {
    it('Should not allow and empty title', () => {
      const Book = (book) => {
        this.saveBook = (req, res) => {
          book.save();
        }
      };
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
      console.info('res.status.args:', res.status.calledWith(400));
      res.status.calledWith(400).should.equal(true, `Bad status ${res.status.args[0][0]}`);
      res.send.calledWith('Title is required').should.equal(true);
    })
  })
});