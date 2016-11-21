var Color = require('color-js');
var _ = require('lodash');
var router = require('express').Router();


router.use('/', function (req, res, next) {
  var color = Color(req.query.color.trim());
  if (_.isEmpty(color))
    throw new Error('could not parse color!')
  res.send(color.toCSSHex().toLowerCase());
});

router.use('/', function (err, req, res, next) {
  console.error(err)
  res.send('Invalid color');
});

module.exports = router;
