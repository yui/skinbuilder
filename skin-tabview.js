
var tabviewSkin,
    refreshTabviewSkin = function() {

    tabviewSkin = {
        skinName: space.skin.name,
        prefix:   space.skin.prefix,

        paddingTab: getPadding(0.3, 0.75),
        paddingTabSelected: getPadding(0.4, 0.75),
        paddingPanel: getPadding(0.25, 0.5),
        tabRadius: getRadius(0.4),    // 30% of global space.radius
        tabBackground: space.block.high.background,
        tabGradient: space.block.high.gradient,
        tabText: space.block.high.text.normal,
        tabBorderLow: space.block.high.border.low,
        tabBorderHigh: space.block.high.border.high,

        tabHoverBackground: space.block.high.hover.background,
        tabHoverGradient: space.block.high.hover.gradient,
        tabHoverText: space.block.high.hover.text.normal,
        tabHoverBorderLow: space.block.high.hover.border.low,
        tabHoverBorderHigh: space.block.high.hover.border.high,

        tabSelectedBackground: space.block.highest.background,
        tabSelectedGradient: space.block.highest.gradient,
        tabSelectedText: space.block.highest.text.normal,
        tabSelectedBorderLow: space.block.highest.border.low,
        tabSelectedBorderHigh: space.block.highest.border.high,

        tabSelectedHoverBackground: space.block.highest.hover.background,
        tabSelectedHoverGradient: space.block.highest.hover.gradient,
        tabSelectedHoverText: space.block.highest.hover.text.normal,
        tabSelectedHoverBorderLow: space.block.highest.hover.border.low,
        tabSelectedHoverBorderHigh: space.block.highest.hover.border.high,

        listBorderColor: space.block.highest.border.low,

        panelBackground: space.background,
        panelBorder: space.border.low,
        panelText: space.text.normal,

        foo: space
    };

};
