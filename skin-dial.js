
var dialSkin,
    refreshDialSkin = function() {

    dialSkin = {
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