YUI.add('skin-dial', function (Y) {

var Skin  = Y.Skin,
    space = Skin.SPACE;

Skin.dial = null;
Skin.refreshDialSkin = function () {
    Skin.dial = {
        skinName: space.skin.name,
        prefix:   space.skin.prefix,

        ringBackgroundColor:        space.background,
        ringGradient:               '-moz-linear-gradient(-45deg, rgba(255,255,255, 0.1) 0%, rgba(255,255,255,0) 39%, rgba(0,0,0,0) 40%, rgba(0,0,0, 0.2) 100%)',
        centerButtonBackgroundColor:    space.block.normal.background,
        centerButtonText:               space.block.normal.text.normal,
        centerButtonGradient:           '-moz-radial-gradient(30% 30% 0deg, circle farthest-side, rgba(255,255,255, 0.3) 24%, rgba(255,255,255, 0) 41%, rgba(0,0,0, 0) 42%, rgba(0,0,0, 0.2) 83%) repeat scroll 0 0 transparent',

        handle:                         space.block.highest.background,
        marker:                         space.text.high,
        northMark:                      space.border.low,
        label:                          space.text.normal,
        valueString:                    space.text.high,

        foo: space
    };
};

}, '0.0.1', {
    requires: ['skin-space']
});
