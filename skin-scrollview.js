
var scrollviewSkin,
    refreshScrollviewSkin = function() {

    scrollviewSkin = {
        skinName: space.skin.name,
        prefix:   space.skin.prefix,

        itemPadding: getPadding(0.3, 0.5),

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