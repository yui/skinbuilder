YUI.add('skin-slider', function (Y) {

var Skin  = Y.Skin,
    space = Skin.SPACE;

Skin.slider = null;
Skin.refreshSliderSkin = function () {
    Skin.slider = {
        skinName: space.skin.name,
        prefix:   space.skin.prefix,

//        paddingTab: Skin.getPadding(0.3, 0.75),
//        tabRadius: Skin.getRadius(0.4),    // 30% of global space.radius

          thumbBackground:      space.block.low.background,
          thumbBorderLight:     space.block.normal.border.low,
          thumbBorderDark:      space.block.normal.rule.low,
          thumbRadiusBottom:    Skin.getRadius(0.3),
          railBackground:       space.background,
          railBorderDark:       space.block.low.rule.low,
          railBorderLight:      space.border.low,

        foo: space
    };
};

}, '0.0.1', {
    requires: ['skin-space']
});
