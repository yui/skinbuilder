YUI.add('skin-form', function (Y) {

Y.Skin.renderers.form = function (skin) {
    var space = skin.colorspace;

    return {

        inputPadding: skin.padding(0.5, 0.6), //0.5em 0.6em
        addonPadding: skin.padding(0.3, 0.8), //0.3em 0.8em
        inputRadius: skin.radius(0.4),  // 40% of the global radius in space.radius (space.js)
        inputRadiusRounded: skin.radius(3),  // 40% of the global radius in space.radius (space.js)
        inputGroupFirstRadius: skin.radius(0.4, 0.4, 0, 0),
        inputGroupLastRadius: skin.radius(0, 0, 0.4, 0.4),
        inputBorder: space.block.container.rule.low, 
        inputBorderFocus: space.block.highest.background, 
        inputShadowInset: space.block.container.border.low,
        label: space.block.container.text.normal,
        inlineHelpText: space.block.container.text.low,
        legendText: space.block.container.text.high,
        legendRule: space.block.container.border.low,
        disabledBackground : space.block.container.background,
        disabledText: space.block.container.text.low
    };
};

}, '0.0.1', {
    requires: []
});
