
var autocompleteSkin,
    refreshAutocompleteSkin = function() {

    autocompleteSkin = {
        skinName: space.skin.name,
        prefix:   space.skin.prefix,

        itemPadding: getPadding(0.2, 0.5), //2px 5px;*/

        background:         space.background,
        border:             space.border.low,
        text:               space.text.normal,


        itemHoverBackground:    space.hover.background,
        textHover:              space.hover.text.normal,
        itemActiveBackground:   space.block.high.background,
        textActive:             space.block.high.text.high,

        foo: space


    };

};