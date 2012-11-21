YUI.add('skin-dial', function (Y) {

var Skin  = Y.Skin,
    space = Skin.SPACE;

Skin.dial = null;
Skin.refreshDialSkin = function () {
    Skin.dial = {
        skinName: space.skin.name,
        prefix:   space.skin.prefix,

        ringBackgroundColor:        space.background,
        ringGradient:               space.gradient,
        centerButtonBackgroundColor:    space.block.normal.background,
        centerButtonText:               space.block.normal.text.normal,


        handle:                         space.block.highest.background,
        marker:                         space.text.high,
        northMark:                      space.border.low,
        label:                          space.text.normal,

        foo: space
    };
};

}, '0.0.1', {
    requires: ['skin-space']
});
