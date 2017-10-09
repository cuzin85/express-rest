import 'babel-polyfill'
import 'should'
import supertest from 'supertest'
import mongoose from 'mongoose'
import {app} from '../index'

const book = mongoose.model('Book');
const agent = supertest.agent(app);

describe('Book crud test', () => {
  describe('Book post test', () => {
    it('Should allow a book to be posted and return a read and _id', (done) => {
      const book = {
        author: 'Oleg',
        title: 'My Title',
        genre: 'Biography'
      };
      agent.post('/api/books')
        .send(book)
        .expect(201)
        .end((err, result) => {
          if (err){
            console.log(err)
          } else {
            result.body.read.should.equal(false);
            result.body.should.have.property('_id');
            done();
          }
      })
    });
    afterEach((done) => {
      // book.remove().exec();
      console.log('From afterEach', book);
      done();
    })
  });
});
