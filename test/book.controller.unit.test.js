import 'babel-polyfill'
import should from 'should'
import sinon from 'sinon'
import booksController from '../controllers/books.controller'


describe('Book controller tests: ', () => {
  describe('post', () => {
    it('Should not allow and empty title', () => {
      const Book = (book) => {
        this.save = () => {
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
        send: sinon.spy
      };
      booksController.post(req, res);

      res.status.calledWith(400).should.equal(false, 'Bad status' + res.status.args[0][0]);
      res.send.calledWith('Title is required').should.equal(false);
    })
  })
});