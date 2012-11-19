
var calendarSkin,
    refreshCalendarSkin = function() {

    calendarSkin = {
        skinName: space.skin.name,
        prefix:   space.skin.prefix,

        containerPadding: getPadding(1, 1, 1.5),  // 100% of the global padding in space.padding (space.js)
        dayPadding: getPadding(0.16,0.16,0.24),
        containerRadius: getRadius(0.8),  // 80% of the global radius in space.radius (space.js)
        background: space.background,
        gradient: space.gradient,
        text: space.text.normal,
        borderHigh: space.border.high,
        borderLow: space.border.low,

        headerText: space.text.high,

        weekdayHeadText: space.text.normal,

        dayBackground: space.hover.background,
        dayText: space.hover.text.normal,
        dayBorder: space.hover.border.low,

        // calendar needs a bit more emphasis on hovering over calendar days
        dayHoverBackground: space.block.normal.hover.background,
        dayHoverText: space.block.normal.hover.text.normal,

        daySelectedBackground: space.block.highest.background,
        daySelectedText: space.block.highest.text.normal,
        daySelectedBorderLow: space.block.highest.border.low,
        daySelectedBorderHigh: space.block.highest.border.high,

        daySelectedHoverBackground: space.block.highest.hover.background,
        daySelectedHoverText: space.block.highest.hover.text.high,
        daySelectedHoverBorderLow: space.block.highest.hover.border.low,
        daySelectedHoverBorderHigh: space.block.highest.hover.border.high,

        nextPrevMonthDayBackground: space.background,
        nextPrevMonthDayText: space.text.low,

        dayDisabledBackground:  space.background,
        dayDisabledText:        space.text.low,

        foo: space
    };

};
