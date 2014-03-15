/*
Copyright 2013 Yahoo! Inc.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add('skin-buttons', function (Y) {

// note: this is the YUI CSS buttons *not* yui3-buttons

Y.Skin.renderers.buttons = function (skin) {
    var space = skin.colorspace;
    return {
        buttonRadius: skin.radius(0.2),
        padding: skin.padding(0.5, 1.5, 0.5),
        background: space.block.high.background,
        // gradient:   space.block.high.gradient,
        text:       space.block.high.text.normal,
        // borderHigh: space.block.high.border.high,
        borderLow:  space.block.high.border.low,



        // hoverBackground:    space.block.high.hover.background,
        // hoverText:          space.block.high.hover.text.normal,
        // hoverBorderHigh:    space.block.high.hover.border.high,
        // hoverBorderLow:     space.block.high.hover.border.low,


        selectedBackground: space.block.highest.background,
        selectedGradient:   space.block.highest.gradient,
        selectedText:       space.block.highest.text.high
        // selectedBorderHigh: space.block.highest.border.high,
        // selectedBorderLow:  space.block.highest.border.low,



        // selectedHoverBackground:    space.block.highest.hover.background,
        // selectedHoverText:          space.block.highest.hover.text.high,
        // selectedHoverBorderHigh:    space.block.highest.hover.border.high,
        // selectedHoverBorderLow:     space.block.highest.hover.border.low
    };
};

}, '0.0.1', {
    requires: []
});
