YUI.add('skin-panel', function (Y) {

var Skin  = Y.Skin,
    space = Skin.SPACE;

Skin.panel = null;
Skin.refreshPanelSkin = function () {
    Skin.panel = {
        skinName: space.skin.name,
        prefix:   space.skin.prefix,

        hdPadding: Skin.getPadding(0.5), // /*8px 28px 8px 8px
        bdPadding: Skin.getPadding(0.5), // /*8px;*/
        ftPadding: Skin.getPadding(0.5), // /*8px;*/
        hdButtonPadding: Skin.getPadding(0.2), // /*8px;*/

        panelRadius:        Skin.getRadius(0.4), // 40% of the global space.radius
        background:         space.background,
        border:             space.block.low.border.low,
        text:               space.text.normal,

        headBackground:         space.block.high.background,
        headGradient:           space.block.high.gradient,
        headBorder:             space.block.high.border.low,
        headText:               space.block.high.text.normal,

        footBackground:         space.block.low.background,

        foo: space.background
    };
};

}, '0.0.1', {
    requires: ['skin-space']
});
