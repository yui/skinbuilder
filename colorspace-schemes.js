YUI.add('colorspace-schemes', function(Y) {

    Y.ColorSpace.schemes.monochrome = {
        background: {h:0, s:-30,  l:90},
        high: {h:0, s:-30, l:60},
        normal: {h:0, s:-30, l:75},
        low: {h:0, s:-30,  l:80}
        // TODO: add container h0s0l0 in constructor to populate container fields.
        //container: {}
    };

    Y.ColorSpace.schemes.complementary = {
        background: {h: 180, s: -30,  l: 90},
        high: {h: 180, s: -40, l: 30},
        normal: {h: 180, s: -40, l: 70},
        low: {h: 180, s: -40,  l: 80}
    };

    Y.ColorSpace.schemes.darkComplementary = {
        background: {h: 0, s: -40,  l: -70},
        high: {h: 180, s: -50, l: -30},
        normal: {h: 180, s: -50, l: -50},
        low: {h: 180, s: -50,  l: -60}
    };

    Y.ColorSpace.schemes.plusGray = {
        background: {h: 0, s: -99,  l: 90},
        high: {h: 0, s: -99, l: 60},
        normal: {h: 0, s: -99, l: 75},
        low: {h: 0, s: -99,  l: 80}
    };

}, '@VERSION@', {'requires': ['colorspace']});
