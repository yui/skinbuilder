
var spaceSkin,
    refreshSpaceSkin = function() {

    spaceSkin = {
        skinName: space.skin.name,
        prefix:   space.skin.prefix,


    //
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
    blockHighestHoverRuleHigh: space.block.highest.hover.rule.high,


        foo: space // only here as last item placeholder without ","
    };

};

// this generates the key: value pairs for all the blocks.
// if you want to change something, change as needed below
// then regenerate and copy from the alert(genCode) below this function.
// This auto gen is just less error prone.
var genCode = "",
    i,
    n,
    block = ['Low', 'Normal', 'High', 'Highest'],
    keyName, // name of key
    dotName,  // name of block in dot syntax
    hover = "";

        keyName = '';
        dotName = '';
        genCode += '\n' +
        '    // ' + dotName + '\n' +
        '    ' + keyName + 'background: space' + dotName + '.background,\n'+
        '    ' + keyName + 'gradient: space' + dotName + '.gradient,\n'+
        '    ' + keyName + 'borderLow: space' + dotName + '.border.low,\n'+
        '    ' + keyName + 'borderHigh: space' + dotName + '.border.high,\n'+
        '    ' + keyName + 'textLow: space' + dotName + '.text.low,\n'+
        '    ' + keyName + 'textNormal: space' + dotName + '.text.normal,\n'+
        '    ' + keyName + 'textHigh: space' + dotName + '.text.high,\n'+
        '    ' + keyName + 'ruleLow: space' + dotName + '.rule.low,\n'+
        '    ' + keyName + 'ruleHigh: space' + dotName + '.rule.high,\n'+
        '';
        keyName = keyName + 'hover';
        dotName = dotName + '.hover';

        genCode += '\n' +
        '    // ' + dotName + '\n' +
        '    ' + keyName + 'Background: space' + dotName + '.background,\n'+
        '    ' + keyName + 'Gradient: space' + dotName + '.gradient,\n'+
        '    ' + keyName + 'BorderLow: space' + dotName + '.border.low,\n'+
        '    ' + keyName + 'BorderHigh: space' + dotName + '.border.high,\n'+
        '    ' + keyName + 'TextLow: space' + dotName + '.text.low,\n'+
        '    ' + keyName + 'TextNormal: space' + dotName + '.text.normal,\n'+
        '    ' + keyName + 'TextHigh: space' + dotName + '.text.high,\n'+
        '    ' + keyName + 'RuleLow: space' + dotName + '.rule.low,\n'+
        '    ' + keyName + 'RuleHigh: space' + dotName + '.rule.high,\n'+
        '';



    for (i = 0; i < block.length; i+=1) {
        keyName = block[i];
        dotName = block[i].toLowerCase();
        for (n = 0; n < 2; n+=1){
            genCode += '\n' +
            '    // ' + dotName + '\n' +
            '    block' + keyName + 'Background: space.block.' + dotName + '.background,\n'+
            '    block' + keyName + 'Gradient: space.block.' + dotName + '.gradient,\n'+
            '    block' + keyName + 'BorderLow: space.block.' + dotName + '.border.low,\n'+
            '    block' + keyName + 'BorderHigh: space.block.' + dotName + '.border.high,\n'+
            '    block' + keyName + 'TextLow: space.block.' + dotName + '.text.low,\n'+
            '    block' + keyName + 'TextNormal: space.block.' + dotName + '.text.normal,\n'+
            '    block' + keyName + 'TextHigh: space.block.' + dotName + '.text.high,\n'+
            '    block' + keyName + 'RuleLow: space.block.' + dotName + '.rule.low,\n'+
            '    block' + keyName + 'RuleHigh: space.block.' + dotName + '.rule.high,\n'+
            '';
            keyName = keyName + 'Hover';
            dotName = dotName + '.hover';
        }
    }

//alert(genCode);  // copy from this and paste into this code below  ruleHigh: space.rule.high,




