YUI.add('skin-form', function (Y) {

Y.Skin.renderers.form = function (skin) {
    var space = skin.colorspace;

    return {

        inputPadding: skin.padding(0.7, 0.7),
        inputRadius: skin.radius(0.4),  // 40% of the global radius in space.radius (space.js)



        // ringBackgroundColor:        space.background,
        // ringGradient:               '-moz-linear-gradient(-45deg, rgba(255,255,255, 0.1) 0%, rgba(255,255,255,0) 39%, rgba(0,0,0,0) 40%, rgba(0,0,0, 0.2) 100%)',
        // centerButtonBackgroundColor:    space.block.normal.background,
        // centerButtonText:               space.block.normal.text.normal,
        // centerButtonGradient:           '-moz-radial-gradient(30% 30% 0deg, circle farthest-side, rgba(255,255,255, 0.3) 24%, rgba(255,255,255, 0) 41%, rgba(0,0,0, 0) 42%, rgba(0,0,0, 0.2) 83%) repeat scroll 0 0 transparent',

        // handle:                         space.block.highest.background,
        // marker:                         space.text.high,
        // northMark:                      space.block.container.text.low,
        // label:                          space.block.container.text.normal,
        valueString:                    space.block.container.text.high
    };
};

}, '0.0.1', {
    requires: []
});
