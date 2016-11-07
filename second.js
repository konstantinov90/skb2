var express = require('express');

var app = express();


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// http://localhost:3000/
var name = 'Имя Отчество Фамилия';
// Gunnlaugsdottir
app.get('/', function (req, res) {
  var name, N, P, surname, yourName,
    invName = 'Invalid fullname';
  name = req.query.fullname;
  if (!name)
    return res.send(invName)
  // var match = name.match(/([\wа-я])[\wа-я]*\s+?([\wа-я])[\wа-я]*\s+([\wа-я]*)/i);
  console.log(name);
  var match = name.match(/([a-zа-яó]+)[\s]*/ig);
  // match.shift();
  // var match = name.split(/\s+/);
  console.log(match);
  if (match.length > 3 || !match || name.match(/[0-9_//]/))
    yourName = invName;
  else if (match.length === 3) {
    N = match[0][0].toUpperCase();
    P = match[1][0].toUpperCase();
    surname = match[2][0].toUpperCase() + match[2].slice(1).toLowerCase();
    yourName = surname + ' ' + N + '. ' + P + '.';
  } else if (match.length === 2) {
    N = match[0][0].toUpperCase();
    surname = match[1][0].toUpperCase() + match[1].slice(1).toLowerCase();
    yourName = surname + ' ' + N + '.';
  } else {
    surname = match[0][0].toUpperCase() + match[0].slice(1).toLowerCase();
    yourName = surname;
  }
  console.log(yourName);
  res.send(yourName);
});


app.listen(3000, function() {
  console.log('listening 3000');
});
