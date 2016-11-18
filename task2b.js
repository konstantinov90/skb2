var router = require('express').Router();

// check mandatory fullname paramter
router.use('/', (req, res, next) => {
  var fullName = req.query.fullname.trim();

  if (!fullName) // parameter mandatory
    return next(new Error('fullname parameter not provided'));

  if (fullName.search(/[\d_\/\\]/) >= 0) // check illegal symbols
    return next(new Error('fullname contains illegal symbols'));

  var names = fullName.split(/\s+/g);
  if (names.length > 3) // may not have more than 3 names
    return next(new Error('too many values provided'));

  req.names = names;
  next();
});

// catch invalid fullname error
router.use('/', (err, req, res, next) => {
  res.send('Invalid fullname');
});

router.get('/', (req, res, next) => {
  var names = req.names;
  var lastName = names.pop().toLowerCase();
  var yourName = `${lastName[0].toUpperCase()}${lastName.slice(1)}`;

  names.forEach(n => {
    yourName += ` ${n[0].toUpperCase()}.`;
  });

  res.send(yourName);
});

module.exports = router;
