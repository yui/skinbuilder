/*
Copyright 2013 Yahoo! Inc.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add('skin-table', function (Y) {

Y.Skin.renderers.table = function (skin) {
    var space = skin.colorspace;
    return {
        captionPadding: skin.padding(1, 0),
        cellPadding: skin.padding(0.3, 0.6),   // 4px 10px 4px 10px;

        headGradient:   space.block.normal.gradient,
        headBackground: space.block.normal.background,
        headText:       space.block.normal.text.normal,
        headTextShadow: space.block.normal.rule.high,
        cellBackground: space.background,
        cellText:       space.text.normal,
        cellOddBackground: space.border.low,
        cellOddText:   space.hover.text.normal,
        border:        space.border.low,
        captionText:    space.block.container.text.low
    };
};

}, '0.0.1', {
    requires: []
});
