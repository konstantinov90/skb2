var express = require('express');

var app = express();



function check_number(a) {
  var num = +a
  if (num === undefined || isNaN(num))
    return 0;
  else
    return num;
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
  var a = check_number(req.query.a);
  var b = check_number(req.query.b);
  // res.send('sum(A + B) = ' + (a + b));
  res.send("" + (a + b));
});


app.listen(3000, function() {
  console.log('listening 3000');
});
