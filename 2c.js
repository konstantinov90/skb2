var express = require('express');

var app = express();


function canonize(url) {
  var username = "";
  var match = (url || username).match(/((https?:)?(\/\/)?(www\.)?([\w_\-0-9]*)\.([^\/]{2,})\/|@?)([^\?\/]*)/i);
  console.log(match)
  if (match) {
    username = match[7]
  }
  console.log(url)
  console.log(username);
  return username?`@${username}`:"Invalid username";
}

canonize('http://xn--80adtgbbrh1bc.xn--p1ai/pavel.durov');
canonize('https://github.com/kriasoft/react-starter-kit')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// http://localhost:3000/
// var name = 'Имя Отчество Фамилия';
// Gunnlaugsdottir
app.get('/', function (req, res) {
  var url;
  url = req.query.username;
  res.send(canonize(url));
});


app.listen(3000, function() {
  console.log('listening 3000');
});
