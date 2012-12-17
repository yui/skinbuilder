YUI.add('skin-scrollview', function (Y) {

Y.Skin.renderers.scrollview = function (skin) {
    var space = skin.colorspace;

    return {
        skinName: skin.name,
        prefix:   skin.prefix,

        itemPadding: skin.padding(0.3, 0.5),

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
