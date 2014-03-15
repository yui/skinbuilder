/*
Copyright 2013 Yahoo! Inc.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add('colorspace-schemes', function(Y) {

    Y.ColorSpace.schemes.monochrome = {
        background: {h:0, s:-30,  l:90},
        high: {h:0, s:-30, l:60},
        normal: {h:0, s:-30, l:75},
        low: {h:0, s:-30,  l:80},
        container: {h:0, s:0, l:0}
    };

    Y.ColorSpace.schemes['color-plus-gray'] = {
        background: {h: 0, s: -99,  l: 90},
        high: {h: 0, s: -99, l: 60},
        normal: {h: 0, s: -99, l: 75},
        low: {h: 0, s: -99,  l: 80},
        container: {h:0, s:0, l:0}
    };

    Y.ColorSpace.schemes.complementary = {
        background: {h: 180, s: -30,  l: 90},
        high: {h: 180, s: -40, l: 30},
        normal: {h: 180, s: -40, l: 70},
        low: {h: 180, s: -40,  l: 80},
        container: {h:0, s:0, l:0}
    };

    Y.ColorSpace.schemes['dark-complementary'] = {
        background: {h: 0, s: -40,  l: -70},
        high: {h: 180, s: -50, l: -30},
        normal: {h: 180, s: -50, l: -50},
        low: {h: 180, s: -50,  l: -60},
        container: {h:0, s:0, l:0}
    };

    Y.ColorSpace.schemes['dark-monochrome'] = {
        background: {h: 0, s: -30,  l: -70},
        high: {h: 0, s: -30, l: -35},
        normal: {h: 0, s: -30, l: -50},
        low: {h: 0, s: -30,  l: -60},
        container: {h:0, s:0, l:0}
   };

}, '@VERSION@', {'requires': ['colorspace']});
