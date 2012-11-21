YUI.add('skin-node-menunav', function (Y) {

var Skin  = Y.Skin,
    space = Skin.SPACE;

Skin.nodeMenunav = null;
Skin.refreshNodeMenunavSkin = function () {
    Skin.nodeMenunav = {
        skinName: space.skin.name,
        prefix:   space.skin.prefix,

        menuContentPadding: Skin.getPadding(0.1, 0),
        itemPadding: Skin.getPadding(0.1, 0.5), ///*0 1em;
        horizontalLabelPadding: Skin.getPadding(0.1, 0.5), /*0 10px;*/
        splitButtonNavPadding: Skin.getPadding(0.1, 0.3, 0.1, 0.5), //*0 5px 0 10px;*/
        togglePadding: Skin.getPadding(0.1, 0.001, 0.1),

        background:         space.background,
        border:             space.border.low,
        splitBorderRight:   space.rule.low,
        splitBorderLeft:    space.rule.low,
        itemSeparator:      space.rule.low,

        text:               space.text.normal,
        horizontalGradient: space.gradient,
        horizontalBackground: space.background,

        itemActiveBackground:   space.hover.background,
        itemAcitveText:         space.hover.text.high,
//        textHover:              space.block.normal.hover.text.normal,
//        selectedMenuItemBackground: space.block.high.background,

        foo: space
    };
};

}, '0.0.1', {
    requires: ['skin-space']
});
