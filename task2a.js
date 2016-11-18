var router = require('express').Router();

function check_number(number) {
  var num = parseFloat(+number);
  return isNaN(num)? 0: num
}

router.get('/', function (req, res) {
  var a = check_number(req.query.a);
  var b = check_number(req.query.b);
  res.send(`${a + b}`);
});

module.exports = router;
