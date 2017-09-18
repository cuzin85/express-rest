import express from 'express';

const app = express();

const port = 8089;
app.get('/', (req, res) => {
  res.send('Express Rest');
});
app.listen(port, (err) => {
  if (err) console.log(err);
  else console.log(`running on port ${port}`);
});