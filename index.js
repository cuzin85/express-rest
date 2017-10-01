import './db'
import express from 'express';
import {booksRouter} from './routes/books.route'
import bodyParser from 'body-parser'

const app = express();
const port = process.env.PORT || 8089;


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