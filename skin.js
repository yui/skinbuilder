YUI.add('skin', function(Y, NAME) {

function Skin() {
    this.init.apply(this, arguments);
};

Skin.renderers = {};

Skin._reUnit = /\D+$/;

Skin.prototype = {
    constructor: Skin,

    prefix: '.yui3-',
    skinPrefix: 'skin-',

    init: function(options) {
        var colorspace = options.scheme;

        if (typeof options.scheme === 'string') {
            colorspace = new Y.ColorSpace({
                scheme: Y.ColorSpace.schemes[options.scheme],
                keycolor: options.color
            });
        }

        this.options = options;
        this.name = options.name;
        this.colorspace = colorspace.getData();

        if (options.prefix) {
            this.prefix = options.prefix;
        }
    },

    radius: function(factor) {
        var radius = this.options.radius || 0;
        return Math.round(radius * factor) + 'px';
    },

    gradient: function(k) {
        var CSSStr = ""+
//         "<!--[if gte IE 9]>"+
//         "  <style type='text/css'>"+
//         "    .gradient {"+
//         "       filter: none;"+
//         "    }"+
//         "  </style>"+
//         "<![endif]-->"+

//        "/* IE9 SVG, needs conditional override of 'filter' to 'none' */"+
//        "background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2ZmZmZmZiIgc3RvcC1vcGFjaXR5PSIwLjIiLz4KICAgIDxzdG9wIG9mZnNldD0iNDklIiBzdG9wLWNvbG9yPSIjZmZmZmZmIiBzdG9wLW9wYWNpdHk9IjAiLz4KICAgIDxzdG9wIG9mZnNldD0iNTElIiBzdG9wLWNvbG9yPSIjMDAwMDAwIiBzdG9wLW9wYWNpdHk9IjAiLz4KICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzAwMDAwMCIgc3RvcC1vcGFjaXR5PSIwLjEiLz4KICA8L2xpbmVhckdyYWRpZW50PgogIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InVybCgjZ3JhZC11Y2dnLWdlbmVyYXRlZCkiIC8+Cjwvc3ZnPg==);"+
        "background: -moz-linear-gradient(top,  rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 49%, rgba(0,0,0,0) 51%, rgba(0,0,0,0.1) 100%);"+
        "background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(255,255,255,0.2)), color-stop(49%,rgba(255,255,255,0)), color-stop(51%,rgba(0,0,0,0)), color-stop(100%,rgba(0,0,0,0.1)));"+
        "background: -webkit-linear-gradient(top,  rgba(255,255,255,0.2) 0%,rgba(255,255,255,0) 49%,rgba(0,0,0,0) 51%,rgba(0,0,0,0.1) 100%);"+
        "background: -o-linear-gradient(top,  rgba(255,255,255,0.2) 0%,rgba(255,255,255,0) 49%,rgba(0,0,0,0) 51%,rgba(0,0,0,0.1) 100%);"+
        "background: -ms-linear-gradient(top,  rgba(255,255,255,0.2) 0%,rgba(255,255,255,0) 49%,rgba(0,0,0,0) 51%,rgba(0,0,0,0.1) 100%);"+
        "background: linear-gradient(to bottom,  rgba(255,255,255,0.2) 0%,rgba(255,255,255,0) 49%,rgba(0,0,0,0) 51%,rgba(0,0,0,0.1) 100%);"+
        "filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#33ffffff', endColorstr='#1a000000',GradientType=0 );";

        return CSSStr;
    },

    _computePadding: function(factor, val) {
        if (typeof val === 'undefined') {
            val = '10px'; // TODO: Break out into default map.
        }

        unit = Skin._reUnit.exec(val) || 'px';
        val = parseFloat(val);

        if (typeof factor === 'undefined') {
            factor = 1;
        }

        val = Math.round((factor * val) * 100 ) / 100;
        return  val + unit;
    },

    padding: function(top, right, bottom, left) {
        var str = '',
            options = this.options,
            unit;

        // TODO: Fix logic for padding shorthand. If no value is given, a
        // a default is needed.
        if (typeof top !== 'undefined') {
            str += this._computePadding(top, options.padding);
        }
        if (typeof right !== 'undefined') {
            str += ' ' + this._computePadding(right, options.padding);
        }
        if (typeof bottom !== 'undefined') {
            str += ' ' + this._computePadding(bottom, options.padding);
        }
        if (typeof left !== 'undefined') {
            str += ' ' + this._computePadding(left, options.padding);
        }
        return str;
    },

    render: function(fn, template) {
        if (typeof fn === 'string') {
            fn = Y.Skin.renderers[fn];
        }
        var data = fn(this);
        data.name = this.skinPrefix + this.name;
        data.prefix = this.prefix;
        console.log(data);
        return Y.Handlebars.compile(template)(data);
    }
};

Y.Skin = Skin;

}, '@VERSION@', {'requires': ['colorspace', 'handlebars']});
