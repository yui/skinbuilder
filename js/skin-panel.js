/*
Copyright 2013 Yahoo! Inc.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add('skin-panel', function (Y) {

Y.Skin.renderers.panel = function (skin) {
    var space = skin.colorspace;
    return {

        hdPadding: skin.padding(0.5), // /*8px 28px 8px 8px
        bdPadding: skin.padding(0.5), // /*8px;*/
        ftPadding: skin.padding(0.5), // /*8px;*/
        hdButtonPadding: skin.padding(0.2), // /*8px;*/

        panelRadius:        skin.radius(0.4), // 40% of the global space.radius
        background:         space.background,
        border:             space.block.low.border.low,
        text:               space.text.normal,

        headBackground:         space.block.high.background,
        headGradient:           space.block.high.gradient,
        headBorder:             space.block.high.border.low,
        headText:               space.block.high.text.normal,

        footBackground:         space.block.low.background
    };
};

}, '0.0.1', {
    requires: []
});
