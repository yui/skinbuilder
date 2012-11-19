
var datatableSkin,
    refreshDatatableSkin = function() {

    datatableSkin = {
        skinName: space.skin.name,
        prefix:   space.skin.prefix,

        captionPadding: getPadding(1, 0),
        cellPadding: getPadding(0.3, 0.6),   // 4px 10px 4px 10px;

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
        captionText:    space.text.low,

        foo: space
    };

};
