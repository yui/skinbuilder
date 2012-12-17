YUI.add('skin-space', function (Y) {

var Skin = Y.namespace('Skin');

// This is the global JSON color space from which all color values are taken.
// The values seen below are defaults and are over-ridden each time the
// user selects a new color

Skin.renderers.space = function(skin) {
    var space = skin.colorspace;
    
    return {
        background: space.background,
        gradient: space.gradient,
        borderLow: space.border.low,
        borderHigh: space.border.high,
        textLow: space.text.low,
        textNormal: space.text.normal,
        textHigh: space.text.high,
        ruleLow: space.rule.low,
        ruleHigh: space.rule.high,

        // hover
        hoverBackground: space.hover.background,
        hoverGradient: space.hover.gradient,
        hoverBorderLow: space.hover.border.low,
        hoverBorderHigh: space.hover.border.high,
        hoverTextLow: space.hover.text.low,
        hoverTextNormal: space.hover.text.normal,
        hoverTextHigh: space.hover.text.high,
        hoverRuleLow: space.hover.rule.low,
        hoverRuleHigh: space.hover.rule.high,


        // container
        blockPageBackground: space.block.container.background,
        blockPageGradient: space.block.container.gradient,
        blockPageBorderLow: space.block.container.border.low,
        blockPageBorderHigh: space.block.container.border.high,
        blockPageTextLow: space.block.container.text.low,
        blockPageTextNormal: space.block.container.text.normal,
        blockPageTextHigh: space.block.container.text.high,
        blockPageRuleLow: space.block.container.rule.low,
        blockPageRuleHigh: space.block.container.rule.high,

        // container.hover
        blockPageHoverBackground: space.block.container.hover.background,
        blockPageHoverGradient: space.block.container.hover.gradient,
        blockPageHoverBorderLow: space.block.container.hover.border.low,
        blockPageHoverBorderHigh: space.block.container.hover.border.high,
        blockPageHoverTextLow: space.block.container.hover.text.low,
        blockPageHoverTextNormal: space.block.container.hover.text.normal,
        blockPageHoverTextHigh: space.block.container.hover.text.high,
        blockPageHoverRuleLow: space.block.container.hover.rule.low,
        blockPageHoverRuleHigh: space.block.container.hover.rule.high,

        // low
        blockLowBackground: space.block.low.background,
        blockLowGradient: space.block.low.gradient,
        blockLowBorderLow: space.block.low.border.low,
        blockLowBorderHigh: space.block.low.border.high,
        blockLowTextLow: space.block.low.text.low,
        blockLowTextNormal: space.block.low.text.normal,
        blockLowTextHigh: space.block.low.text.high,
        blockLowRuleLow: space.block.low.rule.low,
        blockLowRuleHigh: space.block.low.rule.high,

        // low.hover
        blockLowHoverBackground: space.block.low.hover.background,
        blockLowHoverGradient: space.block.low.hover.gradient,
        blockLowHoverBorderLow: space.block.low.hover.border.low,
        blockLowHoverBorderHigh: space.block.low.hover.border.high,
        blockLowHoverTextLow: space.block.low.hover.text.low,
        blockLowHoverTextNormal: space.block.low.hover.text.normal,
        blockLowHoverTextHigh: space.block.low.hover.text.high,
        blockLowHoverRuleLow: space.block.low.hover.rule.low,
        blockLowHoverRuleHigh: space.block.low.hover.rule.high,

        // normal
        blockNormalBackground: space.block.normal.background,
        blockNormalGradient: space.block.normal.gradient,
        blockNormalBorderLow: space.block.normal.border.low,
        blockNormalBorderHigh: space.block.normal.border.high,
        blockNormalTextLow: space.block.normal.text.low,
        blockNormalTextNormal: space.block.normal.text.normal,
        blockNormalTextHigh: space.block.normal.text.high,
        blockNormalRuleLow: space.block.normal.rule.low,
        blockNormalRuleHigh: space.block.normal.rule.high,

        // normal.hover
        blockNormalHoverBackground: space.block.normal.hover.background,
        blockNormalHoverGradient: space.block.normal.hover.gradient,
        blockNormalHoverBorderLow: space.block.normal.hover.border.low,
        blockNormalHoverBorderHigh: space.block.normal.hover.border.high,
        blockNormalHoverTextLow: space.block.normal.hover.text.low,
        blockNormalHoverTextNormal: space.block.normal.hover.text.normal,
        blockNormalHoverTextHigh: space.block.normal.hover.text.high,
        blockNormalHoverRuleLow: space.block.normal.hover.rule.low,
        blockNormalHoverRuleHigh: space.block.normal.hover.rule.high,

        // high
        blockHighBackground: space.block.high.background,
        blockHighGradient: space.block.high.gradient,
        blockHighBorderLow: space.block.high.border.low,
        blockHighBorderHigh: space.block.high.border.high,
        blockHighTextLow: space.block.high.text.low,
        blockHighTextNormal: space.block.high.text.normal,
        blockHighTextHigh: space.block.high.text.high,
        blockHighRuleLow: space.block.high.rule.low,
        blockHighRuleHigh: space.block.high.rule.high,

        // high.hover
        blockHighHoverBackground: space.block.high.hover.background,
        blockHighHoverGradient: space.block.high.hover.gradient,
        blockHighHoverBorderLow: space.block.high.hover.border.low,
        blockHighHoverBorderHigh: space.block.high.hover.border.high,
        blockHighHoverTextLow: space.block.high.hover.text.low,
        blockHighHoverTextNormal: space.block.high.hover.text.normal,
        blockHighHoverTextHigh: space.block.high.hover.text.high,
        blockHighHoverRuleLow: space.block.high.hover.rule.low,
        blockHighHoverRuleHigh: space.block.high.hover.rule.high,

        // highest
        blockHighestBackground: space.block.highest.background,
        blockHighestGradient: space.block.highest.gradient,
        blockHighestBorderLow: space.block.highest.border.low,
        blockHighestBorderHigh: space.block.highest.border.high,
        blockHighestTextLow: space.block.highest.text.low,
        blockHighestTextNormal: space.block.highest.text.normal,
        blockHighestTextHigh: space.block.highest.text.high,
        blockHighestRuleLow: space.block.highest.rule.low,
        blockHighestRuleHigh: space.block.highest.rule.high,

        // highest.hover
        blockHighestHoverBackground: space.block.highest.hover.background,
        blockHighestHoverGradient: space.block.highest.hover.gradient,
        blockHighestHoverBorderLow: space.block.highest.hover.border.low,
        blockHighestHoverBorderHigh: space.block.highest.hover.border.high,
        blockHighestHoverTextLow: space.block.highest.hover.text.low,
        blockHighestHoverTextNormal: space.block.highest.hover.text.normal,
        blockHighestHoverTextHigh: space.block.highest.hover.text.high,
        blockHighestHoverRuleLow: space.block.highest.hover.rule.low,
        blockHighestHoverRuleHigh: space.block.highest.hover.rule.high
    };
};

}, '0.0.1', {
    requires: []
});
