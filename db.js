import mongoose from 'mongoose';

const dbURI = 'mongodb://OlegSapega:bbyby1985@ds123614.mlab.com:23614/books_db';

mongoose.Promise = global.Promise;

mongoose.connect(dbURI, {
  useMongoClient: true
}).then(
  () => {
    console.log(`Mongoose default connection on ${dbURI}`)
  },
  err => {
    console.error(`Mongoose default connection error ${err}`)
  }
);

mongoose.connection.on('disconnected', ()=>{
  console.log(`Mongoose default connection disconnected`);
});

process.on('SIGINT', ()=>{
  console.log(`Mongoose default connection disconnected via app termination`);
  process.exit(0);
});