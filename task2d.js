var Color = require('color-js');
var router = require('express').Router();

// console.log(check_hsl("hsl(195, 100%, 50%)"))
// console.log(check_rgb("rgb(255,255,255)"))
console.log(get_hex("#fffd"))

function get_rgb(color) {
  var crgb = color.match(/^rgb\(\s*(\d*)[,\s]*(\d*)[,\s]*(\d*)\s*\)$/);
  var cnum_required = 3;
  var col;
  if (crgb) {
    col = crgb.shift()
    var cnum = crgb.shift();
    var cntr = 0;
    while(cnum) {

      cntr++;
      if (cnum > 255 || cnum < 0)
        throw new Error('wrong rgb color')
      cnum = crgb.shift();
    }
    if (cntr != 3)
      throw new Error('wrong rgb color')
    return Color(col);
  }
}

function get_rgba(color) {
  var crgba = color.match(/^rgba\(\s*(\d*)[,\s]*(\d*)[,\s]*(\d*)[,\s]*(\d*)\s*\)$/);
  if (crgba) {
    var cnum = crgba.pop();
    if (cnum < 0 || cnum > 1)
      throw new Error('wrong rgba color');
    return get_rgb(`rgb(${crgba[1]},${crgba[2]},${crgba[3]})`);
  }

}
function get_hex(color) {
  var chex = color.match(/^#?([\da-f]{3}|[\da-f]{6})$/i);
  console.log(chex)
  if (chex) {
    return Color("#" + chex[1]);
  }
}
function get_hsl(color) {
  color = color.replace(/%20/g, ' ');
  var chsl = color.match(/^hsl\(\s*(\d*)[,\s]*(\d*)%[,\s]*(\d*)%\s*\)$/);
  console.log(chsl)
  var cnum_required = 3;
  var col;
  if (chsl) {
    col = chsl.shift();
    var cnum = chsl.shift();
    var cntr = 0;
    while (cnum) {
      cntr++;
      if (cntr > 1 && (cnum > 100 || cnum < 0))
        throw new Error('wrong hsl color')
      cnum = chsl.shift();
    }
    if (cntr != 3)
      throw new Error('wrong hsl color')
    return Color(col);

  }
}

router.use('/', function (req, res, next) {
  var color = req.query.color.trim();
  console.log(color)
  resColor = get_hex(color) || get_rgb(color) || get_hsl(color) || get_rgba(color);
  console.log(resColor)
  // crgb = color.match(/^rgb\(([0-9]*)?[^\d]*([0-9]*)?[^\d]*([0-9]*)?[^\d]*([0-9]*)?\)$/i)
  //
  // if (crgb) {
  //   var cntr = 0
  //   console.log(crgb.shift())
  //   var cnum = crgb.shift();
  //   while (cnum) {
  //     cntr ++;
  //     console.log(cnum)
  //     if (((cntr <4) && (cnum > 255 || cnum < 0)) || ((cntr == 4) && (cnum>1 || cnum <1)))
  //       throw new Error('wrong rgb color')
  //     cnum = crgb.shift();
  //   }
  //   if (cntr < 3)
  //     throw new Error('wrong rgb color')
  // }
  // // console.log(color.match(/^#?[\da-f]{3}$|^#?[\da-f]{6}$|^rgb(.*)$/i));
  // else if (!color.match(/^#?[\da-f]{3}$|^#?[\da-f]{6}$|^rgb(.*)$/i)) {
  //   console.error(color);
  //   throw new Error('Invalid color');
  // }
  // if (!color.match(/^#/) && !color.match(/^rgb/))
  //   color = '#' + color;
  res.send(resColor.toString().toLowerCase());
});

router.use('/', function (err, req, res, next) {
  console.error(err)
  res.send('Invalid color');
});

module.exports = router;
