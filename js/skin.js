YUI.add('skin', function(Y) {

// TODO:
// - Use Y.Template for replaceVars abstraction?
// - Handle pre-rendered ColorSpace.
// - Don't allow re-rendering to avoid option syncing?

function Skin() {
    this.init.apply(this, arguments);
}

Skin.renderers = {};

Skin._reUnit = /\D+$/;

Skin.prototype = {
    _openVarToken: '{{',
    _closeVarToken: '}}',

    _replaceVars: function(template, data) {
        var regex = new RegExp(this._openVarToken + '\\s*(.+?)\\s*' + this._closeVarToken, 'g');

        return template.replace ? template.replace(regex, function (match, key) {
            return (key in data) ?  data[key] : match;
        }) : template;
    },

    constructor: Skin,

    defaultPrefix: '.yui3-',
    defaultYuiCssPrefix: '.k-',
    defaultSkinPrefix: 'skin-',
    defaultBorderRadius: 10,
    defaultTextContrast: 1,

    init: function(options) {
        options = Y.merge(options);

        if (!('prefix' in options)) {
            options.prefix = this.defaultPrefix;
        }

        if (!('kimonoPrefix' in options)) {
            options.kimonoPrefix = this.defaultYuiCssPrefix;
        }

        if (!('skinPrefix' in options)) {
            options.skinPrefix = this.defaultSkinPrefix;
        }

        if (!('defaultBorderRadius' in options)) {
            options.defaultBorderRadius = this.defaultBorderRadius;
        }

        if (!('defaultTextContrast' in options)) {
            options.defaultTextContrast = this.defaultTextContrast;
        }

        this.options = options;
        this.initColorSpace();
    },

    initColorSpace: function() {
        var colorspace = this._space;
        if (!colorspace) {
            colorspace = new Y.ColorSpace({
                scheme: this.options.scheme
            });

            this._space = colorspace;
        }


        if (colorspace.scheme !== this.options.scheme) {
            colorspace.options.scheme = this.options.scheme;
        }

        this.colorspace = colorspace.render(this.options.keycolor, this.options.container); //Note to Matt
    },


    _computeRadius: function(factor, val) {
        var unit;

        if (typeof val === 'undefined') {
            val = 10; // TODO: Break out into default map.
        }

        unit = Skin._reUnit.exec(val) || 'px';
        val = parseFloat(val);

        if (typeof factor === 'undefined') {
            factor = 0.4;
        }

        val = Math.round(((factor * val) * 100 ) / 100);
        return  val + unit;
    },


    radius: function(topLeft, topRight, bottomRight, bottomLeft) {
        // TODO: Add a defaultRadius.

        var str = '',
            options = this.options;

        // TODO: Fix logic for padding shorthand. If no value is given, a
        // a default is needed.
        if (typeof topLeft !== 'undefined') {
            str += this._computeRadius(topLeft, options.radius);
        }
        if (typeof topRight !== 'undefined') {
            str += ' ' + this._computeRadius(topRight, options.radius);
        }
        if (typeof bottomRight !== 'undefined') {
            str += ' ' + this._computeRadius(bottomRight, options.radius);
        }
        if (typeof bottomLeft !== 'undefined') {
            str += ' ' + this._computeRadius(bottomLeft, options.radius);
        }
        return str;
    },

    _computePadding: function(factor, val) {
        var unit;

        if (typeof val === 'undefined') {
//            val = '10px'; // TODO: Break out into default map.
            val = 1; // TODO: Break out into default map.
        }

        unit = Skin._reUnit.exec(val) || 'em';
        val = parseFloat(val);

        if (typeof factor === 'undefined') {
            factor = 1;
        }

        val = Math.round((factor * val) * 100 ) / 100;
        return  val + unit;
    },

    padding: function(top, right, bottom, left) {
        var str = '',
            options = this.options;

        // TODO: Fix logic for padding shorthand. If no value is given, a
        // a default is needed.
        if (typeof top !== 'undefined') {
            str += this._computePadding(top, options.paddingVert);
        }
        if (typeof right !== 'undefined') {
            str += ' ' + this._computePadding(right, options.paddingHoriz);
        }
        if (typeof bottom !== 'undefined') {
            str += ' ' + this._computePadding(bottom, options.paddingVert);
        }
        if (typeof left !== 'undefined') {
            str += ' ' + this._computePadding(left, options.paddingHoriz);
        }
        return str;
    },

    // @param renderer {Object|String|function}
    render: function(renderer, template) {
        var options = this.options,
            space = this._space,
            data;

        // Allow a string for convenience.
        if (typeof renderer === 'string') {
            renderer = Y.Skin.renderers[renderer];
        }

        data = renderer;

        // Dynamic renderer, run with skin as argument.
        if (typeof renderer === 'function') {
            // Reinitialize ColorSpace if options have changed.
            if (options.keycolor !== space.options.keycolor ||
                options.scheme !== space.options.scheme ||
                options.container !== space.options.container) {

                this.initColorSpace();
            }

            data = renderer(this);
        }

        // Set name and prefix unless already provided with skin data.

        if (typeof data.skinName === 'undefined') {
            data.skinName = options.skinPrefix + options.name;
        }

        if (typeof data.prefix === 'undefined') {
            data.prefix = options.prefix;
        }

        if (typeof data.kimonoPrefix === 'undefined') {
            data.kimonoPrefix = options.kimonoPrefix;
        }

        return this._replaceVars(template, data);
        //return Y.Handlebars.compile(template)(data);
    }
};

Y.Skin = Skin;

}, '@VERSION@', {'requires': ['colorspace', 'handlebars', 'skin-space']});
