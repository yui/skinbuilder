YUI.add('colorspace', function(Y) {

Y.ColorSpace = function(options) {
    this.init(options);
};

Y.ColorSpace.schemes = {};

Y.ColorSpace.prototype = {
    defaults: {
        container: '#fff',
        textContrast: 1.5    
    },

    constructor: Y.ColorSpace,

    init: function(options) {
        this.options = Y.merge(options, this.defaults);
    },

    adjustColors: function(b) {
        var k = b.background; // the source color, *from* which we adjust to get the new foreground color
        b.text = {
            low: this.adjustColor(k, {h:0, s:0, l:20 * this.options.textContrast}, 'flip'),
            normal: this.adjustColor(k, {h:0, s:0, l:45 * this.options.textContrast}, 'flip'),
            high: this.adjustColor(k, {h:0, s:0, l:55 * this.options.textContrast}, 'flip')
        };

        b.rule = {
            low: this.adjustColor(k, {h:0, s:0, l:-10}),
            high: this.adjustColor(k, {h:0, s:0, l:10})
        };

        b.border = {
            high: this.adjustColor(k, {h:0, s:0, l:10}),
            low: this.adjustColor(k, {h:0, s:0, l:-5})

        };

        b.gradient = this.makeGradient(k);
    },

    getGradientStopColor: function(k, adjustSat, adjustLit, opacity) {
        var color;
        color = this.adjustColor(k, {h:0, s:adjustSat, l:adjustLit}, 'cap');
        color = Y.Color.toRGBA(color);  // needs to be in format of (255, 255, 255, ) instead of hex
        color = color.replace(', 1)', ', ' + opacity + ')');
        return color;
    },

    makeGradient: function(k) {
        var midColor,
            startColor = this.getGradientStopColor(k, 0, 99, 0.3), // these values could be user-controlled to adjust the gradients
            endColor = this.getGradientStopColor(k, 0, -20, 0.3),  // these values could be user-controlled to adjust the gradients
            colorComboStr,
            CSSStr;

        midColor = Y.Color.toRGBA(k);
        midColor = midColor.replace(', 1)', ', 0)');
        colorComboStr = startColor + " 0%, " + midColor + " 49%, " + midColor + " 51%, " + endColor + " 100%";

        CSSStr = ""+
        "background:    -moz-linear-gradient(top, " + colorComboStr + ");\n"+     //  \/* W3C *\/


        "    background:  -webkit-gradient(linear, left top, left bottom, color-stop(0%, " + startColor + "), color-stop(49%, " + midColor + "), color-stop(51%, " + midColor + "), color-stop(100%," + endColor + "));\n"+    //\/* Chrome,Safari4+ *\/
        "    background: -webkit-linear-gradient(top, " + colorComboStr + ");\n"+    // \/* Chrome10+,Safari5.1+ *\/
        "    background:      -o-linear-gradient(top, " + colorComboStr + ");\n"+         // \/* Opera 11.10+ *\/
        "    background:     -ms-linear-gradient(top, " + colorComboStr + ");\n"+       // \/* IE10+ *\/
        "    background:   linear-gradient(to bottom, " + colorComboStr + ");\n"+     //\/* W3C *\/
        "    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#33ffffff', endColorstr='#1a000000',GradientType=0 )"+    // \/* IE6-8 *\/
        // NOTICE NO ENDING ";" on last one. it's in the template after the {{}}

        "";

        return CSSStr;
    },

    getPercentToEndAdjust: function(val, percentToEnd) {
        var theMaxAdjust; // the distance from the val to "the end", meaning either 0 or 1
        if (percentToEnd > 0) { // if going bigger
            theMaxAdjust = 100 - val; // the most you could go from the val to the max (white or full sat)
            return Math.round(theMaxAdjust * (percentToEnd / 100)); // - val; // this gives a factor like 0.2 ...
            // that can be simply added to the val to give the effect of "go this percent of the distance to the max"
        } else {
            theMaxAdjust = val; // the most you could go from val toward dark or low sat or "0"
            return Math.round(theMaxAdjust * (percentToEnd / 100));
        }
    },


    // adjusts the h s l of a color
    /**
     * @param {String} hexInput
     * @param {Object} adjust
     *      @param h integer in the range of 0 to 360
     *      @param s number between 0 and 1
     *      @param l number between 0 and 1
     * @param {string} type. valid strings 'flip', 'cap', 'percent'
     *      flip: when a value goes beyond min or max by some factor,
     *          the value flips to the negative value of change
     *          example: orig value 0.8, adjust by 0.4 results in 0.8 adjust by -0.4
     *      cap: orig value 0.8, adjust by 0.4 results in 1
     *      percent: orig value 0.8, adjust by 0.4 means go 0.4 percent of the distance
     *          from 0.8 to 1 results in  0.88 (0.2 * 0.4 = 0.08 + 0.8)
     */
    adjustColor: function(hexInput, adjustIn, type) {
        var hsl = Y.Color.toArray(Y.Color.toHSL(hexInput)),
            adjust = Y.merge(adjustIn), // Clone to avoid mutating original.
            hex,
            grayProxy,
            grayProxyLightness,
            adjustType = 'cap';   // default

        if (typeof(type) !== 'undefined') {
            adjustType = type;
        }

        // Saturation adjustment if needed
        if ((adjust.s !== 0) && (adjustType === 'percent')) {  // adjust the sat with percent-style adjustment
            adjust.s = this.getPercentToEndAdjust(hsl[1], adjust.s);
        }

        // get a Hex for adjusted sat and
        // Hue adjustment if needed
        // Note: hue adjustment is the same no matter what the adjustment type
        if ((adjust.s !== 0) || (adjust.h !== 0)) {
            hex = Y.Color.getOffset(hexInput, {h: adjust.h, s: adjust.s});
        } else {  // if both Hue and Sat adjust are 0
            hex = hexInput;
        }

        // Convert hex color to gray scale before adjusting lightness
        // Do all the adjusting to the grayProxy color before turning it back into a color
        // of a similar brightness.
        // This compensates for "different hues appear lighter/darker than others" (yellow / blue issue)
        grayProxy = Y.Color.getSimilarBrightness('#808080', hex);
        grayProxyLightness = Math.round(Y.Color.getBrightness(grayProxy));

        // adjust lightness (of grayProxy) based on 'type' attribute
        if (adjustType === 'flip') {
            adjust.l = this.getFlippedAdjust(grayProxy, grayProxyLightness, adjust.l);
        } else if (adjustType === 'percent') {
            adjust.l = this.getPercentToEndAdjust(grayProxyLightness, adjust.l);
        } else if (adjustType !== 'cap') {
            Y.log('a call to adjustColor has an invalid type of: ' + type);
        }
        // adjust grayProxy to the desired lightness
        grayProxy = Y.Color.getOffset(grayProxy, {l: adjust.l});

        // adjust the desired color to have the same brightness as the grayProxy
        hex = Y.Color.getSimilarBrightness(hex, grayProxy);
        return hex;
    },

    /** if lit is adjusted beyond min or max it reverses (flips and subtracts the adjustment if over or under max/min by ______)
     * This is needed for text
     */
    getFlippedAdjust: function(origColor, sourceLit, adjust) {
        var overBy = 10,
            newAdjust = adjust,
            newLit = (parseInt(sourceLit, 10) + adjust);

        // case of adjust > 0
        // if over by big enough amount, then reverse to negative
        if (newLit > (100 + overBy)) {
            if (sourceLit > 50) {
                // the newAdjust will flip the sign of the  
                // requested adjust (flip to a darker color)
                newAdjust = -adjust;                 
            } 
        }

        // case of adjust < 0
        if (newLit < 0 - overBy) {
            if (sourceLit < 50) {
                // the newAdjust will flip the sign of the 
                // requested adjust (flip to a lighter color)
                newAdjust = -adjust;  
            }
        }
        return newAdjust;
    },
        
    makeHoverBlock: function(block, darkBG) {
        block.hover = {};

        if (darkBG) {
            block.hover.background = this.adjustColor(block.background, {h:0, s:0, l:10}, 'percent');
        } else {
            block.hover.background = this.adjustColor(block.background, {h:0, s:0, l:-10}, 'percent');
        }
        this.adjustColors(block.hover);
    },

    _initScheme: function() {
        var scheme = this.options.scheme;
        if (typeof scheme === 'string') {
            scheme = Y.ColorSpace.schemes[scheme];
        }

        this._adjust = {
            highest: {h: 0, s: 0, l: 0}, // No adjustment, just used for setting up fields.
            high: scheme.high,
            normal: scheme.normal,
            low: scheme.low,
            container: {h: 0, s: 0, l: 0, color: this.options.container}
        };

        this._adjustBG = scheme.background;
    },

    render: function(color, containerColor) {
        var block,
            colorspace;

        this.options.keycolor = color;

        this.options.container = containerColor;


        this._initScheme();

        colorspace = {
            background: this.adjustColor(color, this._adjustBG, 'percent'),
            block: {
                highest: {
                    background: color
                },
                container: {
                    background: containerColor
                }
            }
        };

        // colorspace.background is not a block, so we neeed to set its foreground colors and hover colors (FIXME: colorspace.background should be a block)
        // adjustColor*S* sets the colors of foreground things like text, rule, border
        this.adjustColors(colorspace); // this is only creating foreground colors for colorspace.background
        // creates the main blocks color for HOVER (slightly darker/lighter), then calls adjustColor*S* 
        this.makeHoverBlock(colorspace); // this is only creating hover bkg and foreground colors for colorspace.background

        // generate forground and hover object colors for blocks
        for (block in this._adjust) {
            if (this._adjust.hasOwnProperty(block)) {
                var adjustBy = this._adjust[block];

                // case of "highest (keycolor)" and "container" (page bkg)
                // do no adjusting, because Y.Color.getSimilarBrightness adjustColor() 
                // would do some adjustment even with h:0, s:0, l:0.
                // Only do some adjusting if an adjustBy.* is non-zero 
                if(  (adjustBy.h !== 0) || (adjustBy.s !== 0) || (adjustBy.l !== 0)  ){
                    colorspace.block[block] = {
                        background: this.adjustColor(this._adjust[block].color || color, this._adjust[block], 'percent')
                    };
                }
                this.adjustColors(colorspace.block[block]);
                this.makeHoverBlock(colorspace.block[block]);
            }
        }



        return colorspace;
    }
};
// TODO: Figure out why this breaks Y.Color import.
//}, '@VERSION@', {'requires': ['color']});
}, '@VERSION@', {'requires': []});
