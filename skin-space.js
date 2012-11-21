/*
Copyright 2012 Yahoo! Inc. All rights reserved.

Redistribution and use of this software in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
    * Neither the name of Yahoo! Inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission of Yahoo! Inc.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

YUI.add('skin-space', function (Y) {

var Skin = Y.namespace('Skin');

// This is the global JSON color space from which all color values are taken.
// The values seen below are defaults and are over-ridden each time the
// user selects a new color

Skin.SPACE = {
    skin: {
        name: 'mine',
        prefix: '.yui3-' //if you change this, you'll need to replace all the prefixes in the markup, including the ones added by the modules
    },
    radius: 10, // global radius in px. This is to be factored as needed by widgets
    padding: 1, // global padding in em. This is to be factored as needed by widgets

    background: '#FFFFFF',
    gradient: '-moz-linear-gradient(top,  rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 49%, rgba(0,0,0,0) 51%, rgba(0,0,0,0.1) 100%)',

    border: {
        high: '#EFEFEF',
        normal: '',
        low: '#C5C5C5',
        width: 1  // global border-width. This is to be factored as needed by widgets
    },

    text: {
        high: '#252525',
        normal: '#787878',
        low: '#BBBBBB'
    },

    rule: {
        high: '#EEEEEE',
        normal: '',
        low: '#F8F8F8'
    },

    hover: {
        background: '',
        gradient: '-moz-linear-gradient(top,  rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 49%, rgba(0,0,0,0) 51%, rgba(0,0,0,0.1) 100%)',
        border: {
            low: '',
            normal: '',
            high: ''
        },

        text: {
            low: '',
            normal: '',
            high: ''
        },

        rule: {
            low: '',
            normal: '',
            high: ''
        }
    },

    block: {
        low: {
            background: '#fff',     //'#F7F7F7'
            gradient: '-moz-linear-gradient(top,  rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 49%, rgba(0,0,0,0) 51%, rgba(0,0,0,0.1) 100%)',
            border: {
                low: '#CFCFCF',
                normal: '',
                high: '#E6E6E6'
            },

            text: {
                low: '#AAAAAA',
                normal: '#555555',
                high: '#000000'
            },

            rule: {
                low: '#E6E6E6',
                normal: '',
                high: '#D7D7D7'
            },

            hover: {
                background: '#B3D4FF',
                gradient: '-moz-linear-gradient(top,  rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 49%, rgba(0,0,0,0) 51%, rgba(0,0,0,0.1) 100%)',
                border: {
                    low: '#94B8EB',
                    normal: '',
                    high: '#E1E8F2'
                },

                text: {
                    low: '#8BB1E4',
                    normal: '#4C71A4',
                    high: '#112B4E'
                },

                rule: {
                    low: '#A2C9FF',
                    normal: '',
                    high: '#CCE1FF'
                }
            }

        },
        normal: {
            background: '#EDF5FF',
            gradient: '-moz-linear-gradient(top,  rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 49%, rgba(0,0,0,0) 51%, rgba(0,0,0,0.1) 100%)',

            border: {
                low: '#CFE0F5',
                normal: '',
                high: '#E1F0FF'
            },

            text: {
                low: '#AFC6E1',
                normal: '#345781',
                high: '#011023'
            },

            rule: {
                low: '#DBE6F4',
                normal: '',
                high: '#FFF'
            },

            hover: {
                background: '#C3D6ED',
                gradient: '-moz-linear-gradient(top,  rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 49%, rgba(0,0,0,0) 51%, rgba(0,0,0,0.1) 100%)',

                border: {
                    low: '#B3CCEB',
                    normal: '',
                    high: '#E1F0FF'
                },

                text: {
                    low: '#8CA8C9',
                    normal: '#2A5282',
                    high: '#000000'
                },

                rule: {
                    low: '#AEC3DD',
                    normal: '',
                    high: '#DFE9F5'
                }
            }

        },

        high: {
            background: '#E6E6E6',
            gradient: '-moz-linear-gradient(top, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 49%, rgba(0,0,0,0) 51%, rgba(0,0,0,0.1) 100%)',

            border: {
                    low: '#ADADAD',
                    normal: '',
                    high: '#DADADA'
            },

            text: {
                low: '#B7B7B7',
                normal: '#606060',
                high: '#000'
            },

            rule: {
                low: '#CDCDCD',
                normal: '',
                high: '#FBFBFB'
            },

            hover: {
                background: '#CBCBCB',
                gradient: '-moz-linear-gradient(top, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 49%, rgba(0,0,0,0) 51%, rgba(0,0,0,0.1) 100%)',

                border: {
                    low: '#ADADAD',
                    normal: '',
                    high: '#BEBEBE'
                },

                text: {
                    low: '#999999',
                    normal: '#323232',
                    high: '#000'
                },

                rule: {
                    low: '#B8B8B8',
                    normal: '',
                    high: '#E3E3E3'
                }

            }

        },


        highest: {
            background: '#3355BA',
            gradient: '-moz-linear-gradient(top, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 49%, rgba(0,0,0,0) 51%, rgba(0,0,0,0.1) 100%)',

            border: {
                low: '#0B2981',
                normal: '',
                high: '#6680CC'
            },

            text: {
                low: '#708EE6',
                normal: '#D9E2FF', //space.block.normal.text.low,//
                high: '#fff'
            },

            rule: {
                low: '#223A80',
                normal: '',
                high: '#4A69C4'
            },

            hover: {
                background: '#1B3A95',
                gradient: '-moz-linear-gradient(top, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 49%, rgba(0,0,0,0) 51%, rgba(0,0,0,0.1) 100%)',

                border: {
                    low: '#041D67',
                    normal: '',
                    high: '#6680CC'
                },

                text: {
                    low: '#5675CF',
                    normal: '#EFF3FF',
                    high: '#fff'
                },

                rule: {
                    low: '#162D6F',
                    normal: '',
                    high: '#314D9F'
                }
            }

        }

    }
};

Skin.KEY_COLOR = {
    page: '#ffffff',
    background: '#ffffff',      // orange-sat:low, lit:high =F9F6F2      green, sat:low, lit: high = F4F7F5
    block: {
        low: {
            background: ''
        },
        normal: {
            background: ''
        },
        high: {
            background: ''
        },
        highest: {
            background: '#3355BA'  //'sam blue#'      brick red=B54A4A      ff0000
        }
    }
};

// This returns a value for a CSS border-radius property
// It's used by Widget Map files to set radii for widget specific objects
// at a value equal to some factor of the global radius value found in
// Skin.SPACE.radius
// Skin.SPACE.radius can then be manipulated by UI and the widgets will respond proportionally
Skin.getRadius = function(factor) {
    return Math.round(Skin.SPACE.radius * factor) + 'px';
};

Skin.getPadding = function(top, right, bottom, left) {
    var str = "";

    if (top) {
        str += (Math.round((Skin.SPACE.padding * top) * 100 ) / 100) + 'em ';
    }
    if (right) {
        str += (Math.round((Skin.SPACE.padding * right) * 100 ) / 100) + 'em ';
    }
    if (bottom) {
        str += (Math.round((Skin.SPACE.padding * bottom) * 100 ) / 100) + 'em ';
    }
    if (left) {
        str += (Math.round((Skin.SPACE.padding * left) * 100 ) / 100) + 'em';
    }
    return str;
};

Skin.space = null;
Skin.refreshSpaceSkin = function () {
    var space = Skin.SPACE;

    Skin.space = {
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

Skin.generateSpaceCode = function () {
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
};

}, '0.0.1', {
    requires: []
});
