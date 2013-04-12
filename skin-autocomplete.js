YUI.add('skin-autocomplete', function (Y) {

Y.Skin.renderers.autocomplete = function (skin) {
    var space = skin.colorspace;

    return {
        itemPadding: skin.padding(0.2, 0.5), //2px 5px;*/

        background:         space.background,
        border:             space.border.low,
        text:               space.text.normal,

        itemHoverBackground:    space.hover.background,
        textHover:              space.hover.text.normal,
        itemActiveBackground:   space.block.high.background,
        textActive:             space.block.high.text.high
    };
};

}, '0.0.1', {
    requires: []
});
