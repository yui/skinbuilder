YUI.add('skin-slider', function (Y) {

Y.Skin.renderers.slider = function (skin) {
    var space = skin.colorspace;

    return {

//        paddingTab: Skin.getPadding(0.3, 0.75),
//        tabRadius: Skin.getRadius(0.4),    // 30% of global space.radius

          thumbBackground:      space.block.low.background,
          thumbBorderLight:     space.block.normal.border.low,
          thumbBorderDark:      space.block.normal.rule.low,
          thumbRadiusBottom:    skin.radius(0.3),
          railBackground:       space.background,
          railBorderDark:       space.block.low.rule.low,
          railBorderLight:      space.border.low
    };
};

}, '0.0.1', {
    requires: []
});
