YUI.add('skin-scrollview', function (Y) {

var Skin  = Y.Skin,
    space = Skin.SPACE;

Skin.scrollview = null;
Skin.refreshScrollviewSkin = function () {
    Skin.scrollview = {
        skinName: space.skin.name,
        prefix:   space.skin.prefix,

        itemPadding: Skin.getPadding(0.3, 0.5),

        background:         space.background,
        border:             space.border.low,
        itemBorderBottom:   space.rule.low,
        text:               space.text.normal,


        itemHoverBackground:    space.hover.background,
        itemHoverBorderBottom:  space.hover.background,
        textHover:              space.hover.text.high,

        scrollbarBackground:  space.block.normal.background,

        foo: space
    };
};

}, '0.0.1', {
    requires: ['skin-space']
});
