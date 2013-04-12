YUI.add('skin-node-menunav', function (Y) {

Y.Skin.renderers.nodeMenunav = function (skin) {
    var space = skin.colorspace;

    return {
        menuContentPadding: skin.padding(0.1, 0),
        itemPadding: skin.padding(0.1, 0.5), ///*0 1em;
        horizontalLabelPadding: skin.padding(0.1, 0.5), /*0 10px;*/
        splitButtonNavPadding: skin.padding(0.1, 0.3, 0.1, 0.5), //*0 5px 0 10px;*/
        togglePadding: skin.padding(0.1, 0.001, 0.1),

        background:         space.background,
        border:             space.border.low,
        splitBorderRight:   space.rule.low,
        splitBorderLeft:    space.rule.low,
        itemSeparator:      space.rule.low,

        text:               space.text.normal,
        horizontalGradient: space.gradient,
        horizontalBackground: space.background,

        itemActiveHorizontalBorder: space.border.low,
        itemActiveHorizontalBackgroundGradient: space.block.low.hover.gradient,
        itemActiveHorizontalBackgroundColor:    space.block.low.hover.background,

        itemActiveBackground:   space.hover.background,
        itemAcitveText:         space.hover.text.high
    };
};

}, '0.0.1', {
    requires: []
});
