import mongoose from 'mongoose';
import config from './config.json';
const dbConfig = process.env.NODE_ENV === 'test' ? config.test : config.dev;
const dbURI = `mongodb://${dbConfig.user}:${dbConfig.password}@${dbConfig.server}:${dbConfig.dbPort}/${dbConfig.name}`;

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