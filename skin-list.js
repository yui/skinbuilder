YUI.add('skin-list', function (Y) {

Y.Skin.renderers.list = function (skin) {
    var space = skin.colorspace;
    return {



        menuItemPadding: skin.padding(0.35, 1.4),
        borderRadius: skin.radius(0.3),
        headingText: space.text.high,
        separator: space.block.container.rule.low,
        menuBackground: space.background,
        menuText: space.text.normal,
        menuTextDisabled: space.text.low,
        menuHoverBackground: space.hover.background,
        menuHoverText: space.hover.text.normal,
        menuBorder: space.border.low,
        menuSelectedBackground: space.block.highest.background,
        menuSelectedText: space.block.highest.text.normal,
        fixedMenuBorderBottom: space.border.low,
        // paginator
        paginatorRadiusPrev: skin.radius(0.4, 0, 0, 0.4),
        paginatorRadiusNext: skin.radius(0, 0.4, 0.4, 0)
    };
};

}, '0.0.1', {
    requires: []
});
