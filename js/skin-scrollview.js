/*
Copyright 2013 Yahoo! Inc.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add('skin-scrollview', function (Y) {

Y.Skin.renderers.scrollview = function (skin) {
    var space = skin.colorspace;

    return {
        itemPadding: skin.padding(0.3, 0.5),

        background:         space.background,
        border:             space.border.low,
        itemBorderBottom:   space.rule.low,
        text:               space.text.normal,


        itemHoverBackground:    space.hover.background,
        itemHoverBorderBottom:  space.hover.background,
        textHover:              space.hover.text.high,

        scrollbarBackground:  space.block.normal.background
    };
};

}, '0.0.1', {
    requires: []
});
