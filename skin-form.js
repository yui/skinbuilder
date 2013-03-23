YUI.add('skin-form', function (Y) {

Y.Skin.renderers.form = function (skin) {
    var space = skin.colorspace;

    return {

        inputPadding: skin.padding(0.5, 0.6), //0.5em 0.6em
        addonPadding: skin.padding(0.3, 0.8), //0.3em 0.8em
        inputRadius: skin.radius(0.4),  // 40% of the global radius in space.radius (space.js)
        inputRadiusRounded: skin.radius(3),  // 40% of the global radius in space.radius (space.js)
        inputBorder: space.block.container.rule.low, 
        inputBorderFocus: space.block.highest.background, 
        inputShadowInset: space.block.container.border.low,
        label: space.block.container.text.normal,
        legendText: space.block.container.text.high,
        legendRule: space.block.container.border.low,
        disabledBackground : space.block.container.background,
        disabledText: space.block.container.text.low,
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
