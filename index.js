var express = require('express');
var cors = require('cors');

var task2a = require('./task2a');
var task2b = require('./task2b');
var task2c = require('./task2c');
var task2d = require('./task2d');

var app = express();

app.use(cors());

app.use('/task2a', task2a);
app.use('/task2b', task2b);
app.use('/task2c', task2c);
app.use('/task2d', task2d);

app.get('/', (req, res) => {
  res.send(`
    <ol>
      <li><a href="/task2a/?a=10&b=15.4">Task 2A</a></li>
      <li><a href="/task2b/?fullname=Alexander Sergeevich Konstantinov">Task 2B</a></li>
      <li><a href="/task2c/?username=telegram.me/konstantinov90">Task 2C</a></li>
    </ol>
  `);
});

app.listen(3000, function() {
  console.log('listening 3000');
});
