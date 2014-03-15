/*
Copyright 2013 Yahoo! Inc.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add('skin-slider', function (Y) {

Y.Skin.renderers.slider = function (skin) {
    var space = skin.colorspace;

    return {

//        paddingTab: Skin.getPadding(0.3, 0.75),
//        tabRadius: Skin.getRadius(0.4),    // 30% of global space.radius

          thumbBackground:      space.block.low.background,
          thumbBorderLight:     space.block.normal.border.low,
          thumbBorderDark:      space.block.normal.rule.low,
          thumbRadius:          '50% 50% 3px 3px',
          thumbRadiusY:         '50% 3px 3px 50%',
          railBackground:       space.background,
          railBorderDark:       space.block.low.rule.low,
          railBorderLight:      space.border.low
    };
};

}, '0.0.1', {
    requires: []
});
