import mongoose from 'mongoose';
import config from './config';
const dbConfig = process.env.NODE_ENV === 'test' ? config.db.test : config.db.dev;
const dbURI = `mongodb://${dbConfig.user}:${dbConfig.password}@${dbConfig.server}:${dbConfig.port}/${dbConfig.name}`;

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