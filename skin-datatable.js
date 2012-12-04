YUI.add('skin-datatable', function (Y) {

var Skin  = Y.Skin,
    space = Skin.SPACE;

Skin.datatable = null;
Skin.refreshDatatableSkin = function () {
    Skin.datatable = {
        skinName: space.skin.name,
        prefix:   space.skin.prefix,

        captionPadding: Skin.getPadding(1, 0),
        cellPadding: Skin.getPadding(0.3, 0.6),   // 4px 10px 4px 10px;

        headGradient:   space.block.normal.gradient,
        headBackground: space.block.normal.background,
        headText:       space.block.normal.text.normal,
        headBorder:     space.border.low,
        cellBackground: space.background,
        cellText:       space.text.normal,
        cellEvenBackground: space.border.low,
        cellEvenText:   space.hover.text.normal,

        headSortedBackground:   space.block.high.background,
        headSortedGradient:     space.block.high.gradient,
        headSortedText:         space.block.high.text.normal,
        headSortedHoverBackground:   space.block.high.background,
        headSortedHoverText:         space.block.high.text.normal,

        cellSortedEvenBackground:   space.block.low.border.low,
        cellSortedOddBackground:   space.block.low.background,
        cellSortedEvenText:         space.block.low.hover.text.normal,

        border:        space.border.low,
        captionText:    space.block.page.text.low,

        foo: space
    };
};

}, '0.0.1', {
    requires: ['skin-space']
});
