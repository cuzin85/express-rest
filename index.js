import './db'
import config from './config.json';
import express from 'express';
import {booksRouter} from './routes/books.route'
import bodyParser from 'body-parser'

export const app = express();

const dbConfig = process.env.NODE_ENV === 'test' ? config.test : config.dev;

const port = dbConfig.port;


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api/books', booksRouter);

app.get('/', (req, res) => {
  res.send('Express Rest');
});
app.listen(port, (err) => {
  if (err) console.log(err);
  else console.log(`running on port ${port}`);
});