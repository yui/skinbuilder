/*
Copyright 2013 Yahoo! Inc.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add('skin-tabview', function (Y) {

Y.Skin.renderers.tabview = function (skin) {
    var space = skin.colorspace,
        block = skin.colorspace.block;

    return {
        paddingTab: skin.padding(0.3, 0.75),
        paddingTabSelected: skin.padding(0.4, 0.75),
        paddingPanel: skin.padding(0.25, 0.5),
        tabRadius: skin.radius(0.4),    // 30% of global radius

        tabBackground: block.high.background,
        tabGradient: block.high.gradient,
        tabText: block.high.text.normal,
        tabBorderLow: block.high.border.low,
        tabBorderHigh: block.high.border.high,

        tabHoverBackground: block.high.hover.background,
        tabHoverGradient: block.high.hover.gradient,
        tabHoverText: block.high.hover.text.normal,
        tabHoverBorderLow: block.high.hover.border.low,
        tabHoverBorderHigh: block.high.hover.border.high,

        tabSelectedBackground: block.highest.background,
        tabSelectedGradient: block.highest.gradient,
        tabSelectedText: block.highest.text.normal,
        tabSelectedBorderLow: block.highest.border.low,
        tabSelectedBorderHigh: block.highest.border.high,

        tabSelectedHoverBackground: block.highest.hover.background,
        tabSelectedHoverGradient: block.highest.hover.gradient,
        tabSelectedHoverText: block.highest.hover.text.normal,
        tabSelectedHoverBorderLow: block.highest.hover.border.low,
        tabSelectedHoverBorderHigh: block.highest.hover.border.high,

        listBorderColor: block.highest.border.low,

        panelBackground: space.background,
        panelBorder: space.border.low,
        panelText: space.text.normal
    };
};

}, '0.0.1', {
    requires: ['skin']
});
