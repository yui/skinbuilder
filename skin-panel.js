
var panelSkin,
    refreshPanelSkin = function() {

    panelSkin = {
        skinName: space.skin.name,
        prefix:   space.skin.prefix,

        hdPadding: getPadding(0.5), // /*8px 28px 8px 8px
        bdPadding: getPadding(0.5), // /*8px;*/
        ftPadding: getPadding(0.5), // /*8px;*/
        hdButtonPadding: getPadding(0.2), // /*8px;*/

        panelRadius:        getRadius(0.4), // 40% of the global space.radius
        background:         space.background,
        border:             space.block.low.border.low,
        text:               space.text.normal,

        headBackground:         space.block.high.background,
        headGradient:           space.block.high.gradient,
        headBorder:             space.block.high.border.low,
        headText:               space.block.high.text.normal,

        footBackground:         space.block.low.background,

        foo: space


    };

};