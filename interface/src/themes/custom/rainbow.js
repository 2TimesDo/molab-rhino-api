/*
 * Rainbow theme :
 * All pixels fade through all colours in sync.
 */

var logger = require('../../log/index').logger;
var log = new logger("themes.custom.rainbow");

var Color = require('color');

var colorWheel = function(wheelPosition) {
    var r,g,b;
    var wp = 255 - wheelPosition;

    if(wp < 85) {
        r = 255 - wp*3;
        g = 0;
        b = wp * 3;
    } else if (wp <170 ) {
        wp -= 85;
        r = 0;
        g = wp * 3;
        b = 255 - wp * 3;
    } else {
        wp -= 170;
        r = wp * 3;
        g = 255 - wp * 3;
        b = 0;
    }
    return Color({r:r, g:g, b:b});
};

module.exports = function(display) {
    return new Promise (function(resolve, reject){
        log.info("Setting pixels to rainbow");
        var loopNum = 0;
        var cwi = 0;
        var loop = setInterval(function () {
            global.ledTheme = loop;
            cwi +=5;
            if (cwi > 255) {
                loopNum++;
                cwi =0;
            }
            display.setAllPixelsToColor(colorWheel(cwi));
            if (loopNum >= 10){
                clearInterval(loop);
                global.ledTheme = null;
                resolve ();
            }
        }, 1000/10);
    });
};