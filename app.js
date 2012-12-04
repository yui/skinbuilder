YUI({
    modules: {
        'skin-space'       : 'skin-space.js',
        'skin-autocomplete': 'skin-autocomplete.js',
        'skin-button'      : 'skin-button.js',
        'skin-calendar'    : 'skin-calendar.js',
        'skin-datatable'   : 'skin-datatable.js',
        'skin-dial'        : 'skin-dial.js',
        'skin-node-menunav': 'skin-node-menunav.js',
        'skin-overlay'     : 'skin-overlay.js',
        'skin-panel'       : 'skin-panel.js',
        'skin-scrollview'  : 'skin-scrollview.js',
        'skin-tabview'     : 'skin-tabview.js',
        'skin-slider'      : 'skin-slider.js',

        'skinner': {
            use: [
                'skin-space', 'skin-autocomplete', 'skin-button',
                'skin-calendar', 'skin-datatable', 'skin-dial',
                'skin-node-menunav', 'skin-overlay', 'skin-panel',
                'skin-scrollview', 'skin-tabview', 'skin-slider'
            ]
        }
    }
}).use(
    'skinner', 'handlebars',
    'slider', 'overlay', 'panel', 'node-menunav', 'dial', 'autocomplete',
    'autocomplete-filters', 'autocomplete-highlighters', 'scrollview',
    'datatable-sort', 'dd-drag', 'dd-constrain', 'calendar', 'button-plugin',
    'tabview', 'datatype-date', 'button-group', 'cssbutton',
    'node-event-delegate', 'overlay', 'slider', 'color',
function (Y) {

    // Supports the old global `space`.
    var space = Y.Skin.SPACE;

    var schemeName =  'monochrome', // default schemeName
        arrSchemeNames = ['monochrome', 'color-plus-gray', 'complimentary', 'dark-complimentary'],

    // returns hsl Array
    hexToHsl = function(hexInput) {
        var hslStr = Y.Color.toHSL(hexInput),
            hslArr = Y.Color.toArray(hslStr);

        return hslArr;
    },


    getPercentToEndAdjust = function(val, percentToEnd) {
        var theMaxAdjust; // the distance from the val to "the end", meaning either 0 or 1
        if (percentToEnd > 0){ // if going bigger
            theMaxAdjust = 100 - val; // the most you could go from the val to the max (white or full sat)
            return Math.round(theMaxAdjust * (percentToEnd / 100));// - val; // this gives a factor like 0.2 ...
            // that can be simply added to the val to give the effect of "go this percent of the distance to the max"
        }else{
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
    adjustColor = function(hexInput, adjustInp, type) {
        var hsl = hexToHsl(hexInput),
            hex,
            grayProxy,
            adjust = adjustInp,
            adjustType = 'cap';   // default

        if (typeof(type) != 'undefined') {
            adjustType = type;
        }

        // Saturation adjustment if needed
        if ((adjust.s !== 0) && (adjustType === 'percent')) {  // adjust the sat with percent-style adjustment
            adjust.s = getPercentToEndAdjust(hsl[1], adjust.s);
        }

        // get a Hex for adjusted sat and
        // Hue adjustment if needed
        // Note: hue adjustment is the same no matter what the adjustment type
        if ((adjustInp.s !== 0) || (adjustInp.h !== 0)) {
            hex = Y.Color.getOffset(hexInput, {h: adjust.h, s: adjust.s});
        } else {  // if both Hue and Sat adjust are 0
            hex = hexInput;
        }

        // Convert hex color to gray scale before adjusting lightness
        // Do all the adjusting to the grayProxy color before turning it back into a color
        // of a similar brightness.
        // This compensates for "different hues appear lighter/darker than others" (yellow / blue issue)
        grayProxy = Y.Color.getSimilarBrightness('#808080', hex);
        grayProxyLightness = Math.round(Y.Color.getBrightness(grayProxy) * 100);  // fixme when Tony changes api for getBrightness to return values in range of 0 - 100

        // adjust lightness (of grayProxy) based on 'type' attribute
        if (adjustType === 'cap') {
            //adjust.l = adjust.l;
        } else if (adjustType === 'flip') {
            adjust.l = getFlippedAdjust(grayProxy, grayProxyLightness, adjust.l);
        } else if (adjustType === 'percent') {
            adjust.l = getPercentToEndAdjust(grayProxyLightness, adjust.l);
        } else {
            alert('a call to adjustColor has an invalid type of: ' + type);
        }
        // adjust grayProxy to the desired lightness
        grayProxy = Y.Color.getOffset(grayProxy, {l: adjust.l});

        // adjust the desired color to have the same brightness as the grayProxy
        hex = Y.Color.getSimilarBrightness(hex, grayProxy);
        Y.log('hex: ' + hex);
        return hex;
    },

    /** if lit is adjusted beyond min or max it reverses (flips and subtracts the adjustment if over or under max/min by ______)
     * This is needed for text
     * Note: when text is offset from it's background by some amount,
     * text readability is affected by the current hue.
     * This is due to perceived brightness.
     * One way to compensate is to determine when to "flip" the sign of the adjust
     * by perceived brightness of the background color lit + adjust
     * instead of                     background color lit + adjust
     *
     *
     */
    getFlippedAdjust = function(origColor, sourceLit, adjust) {
        var overBy = 10,
            newAdjust = adjust,
            newLit = (parseInt(sourceLit, 10) + adjust);
//            newLit = (parseInt(Y.Color.getBrightness(origColor) * 100, 10) + adjust);      // XXX

        // if over by big enough amount, then reverse to negative
        if (newLit > (100 + overBy)) {
            newAdjust = -adjust; // the newAdjust will flip the sign of the requested adjust (flip to a darker color)
        } else if (newLit > 100) { // let it stay at max
            newAdjust = adjust; // Y.Color will cap at max
        }
        if (newLit < 0 - overBy) {
            newAdjust = -adjust;  // the newAdjust will flip the sign of the requested adjust (flip to a lighter color)
        } else if (newLit < 0) {
            newAdjust = adjust;
        }
        return newAdjust;
    },


    // color schemes and foreground color gen ////////////////////////////////////////////////
    makeGradient = function(k) {
        var CSSStr = ""+
//         "<!--[if gte IE 9]>"+
//         "  <style type='text/css'>"+
//         "    .gradient {"+
//         "       filter: none;"+
//         "    }"+
//         "  </style>"+
//         "<![endif]-->"+

        "/* IE9 SVG, needs conditional override of 'filter' to 'none' */"+
//        "background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2ZmZmZmZiIgc3RvcC1vcGFjaXR5PSIwLjIiLz4KICAgIDxzdG9wIG9mZnNldD0iNDklIiBzdG9wLWNvbG9yPSIjZmZmZmZmIiBzdG9wLW9wYWNpdHk9IjAiLz4KICAgIDxzdG9wIG9mZnNldD0iNTElIiBzdG9wLWNvbG9yPSIjMDAwMDAwIiBzdG9wLW9wYWNpdHk9IjAiLz4KICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzAwMDAwMCIgc3RvcC1vcGFjaXR5PSIwLjEiLz4KICA8L2xpbmVhckdyYWRpZW50PgogIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InVybCgjZ3JhZC11Y2dnLWdlbmVyYXRlZCkiIC8+Cjwvc3ZnPg==);"+
        "background: -moz-linear-gradient(top,  rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 49%, rgba(0,0,0,0) 51%, rgba(0,0,0,0.1) 100%); /* FF3.6+ */"+
        "background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(255,255,255,0.2)), color-stop(49%,rgba(255,255,255,0)), color-stop(51%,rgba(0,0,0,0)), color-stop(100%,rgba(0,0,0,0.1))); /* Chrome,Safari4+ */"+
        "background: -webkit-linear-gradient(top,  rgba(255,255,255,0.2) 0%,rgba(255,255,255,0) 49%,rgba(0,0,0,0) 51%,rgba(0,0,0,0.1) 100%); /* Chrome10+,Safari5.1+ */"+
        "background: -o-linear-gradient(top,  rgba(255,255,255,0.2) 0%,rgba(255,255,255,0) 49%,rgba(0,0,0,0) 51%,rgba(0,0,0,0.1) 100%); /* Opera 11.10+ */"+
        "background: -ms-linear-gradient(top,  rgba(255,255,255,0.2) 0%,rgba(255,255,255,0) 49%,rgba(0,0,0,0) 51%,rgba(0,0,0,0.1) 100%); /* IE10+ */"+
        "background: linear-gradient(to bottom,  rgba(255,255,255,0.2) 0%,rgba(255,255,255,0) 49%,rgba(0,0,0,0) 51%,rgba(0,0,0,0.1) 100%); /* W3C */"+
        "filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#33ffffff', endColorstr='#1a000000',GradientType=0 ); /* IE6-8 */"+

        ""+
        "";

        return CSSStr;
    },

    /**
     * This adjusts and sets the value of all the foreground object colors associated with a block
     * It also assigns the adjusted values to the objects in the master color var, "space"
     * found in space.js
     * @param {Object} block. A specific block from space. For example space.block.normal
     */
    adjustForegroundColors = function(block) {
        var b = block,
            k = b.background; // the source color, *from* which we adjust to get the new foreground color
        b.text.low = adjustColor(k, {h:0, s:0, l:20}, 'flip');
        b.text.normal = adjustColor(k, {h:0, s:0, l:45}, 'flip');    // was l:40
        b.text.high = adjustColor(k, {h:0, s:0, l:55}, 'flip');
        b.rule.low = adjustColor(k, {h:0, s:0, l:-10});
        b.rule.high = adjustColor(k, {h:0, s:0, l:10});
        b.border.high = adjustColor(k, {h:0, s:0, l:10});
        b.border.low = adjustColor(k, {h:0, s:0, l:-5});
        b.gradient = makeGradient(k);
    },

    /**
     * This makes an entire "hover" block including it's foreground object colors
     * based on it's non-hover state
     * It also assigns the adjusted values to the objects in the master color var, "space"
     * found in space.js
     * @param {Object} block. A specific block from space. For example space.block.normal
     */
    makeHoverBlock = function(block) {

        var pageLite = Y.Color.toArray(Y.Color.toHSL(Y.Skin.KEY_COLOR.page));
        if (pageLite[2] < 50) {
            block.hover.background = adjustColor(block.background, {h:0, s:0, l:10}, 'percent');
        } else {
            block.hover.background = adjustColor(block.background, {h:0, s:0, l:-10}, 'percent');
        }
        adjustForegroundColors(block.hover);
    },

    // This sets all the values in the space JSON object, based on scheme definition below
    // Argument is the string name of the scheme
    // all calculations are based on the user color-picker selected color (Y.Skin.KEY_COLOR.block.highest.background)
    setColors = function(schemeName){
        var b,
            k = Y.Skin.KEY_COLOR.block.highest.background,  // note: this is from Y.Skin.KEY_COLOR set by end user intention as the highest block background
            blocks,
            i,
            setColorsPerBlock = function(blocks) { // generates all the colors for each block
                var b = space.block.highest;
                // assign the user color picked value to space.block.highest.background
                // The background of the highest value block is always the user picked color
                space.block.highest.background = k;
                space.block.page.background = Y.Skin.KEY_COLOR.page;
                adjustForegroundColors(b); // generate foreground object colors for this block
                makeHoverBlock(b); // generate hover block and it's forground object colors for this block

                // generate forground and hover object colors for all other, non-space.block.highest,  blocks
                for (i = 0; i < blocks.length; i += 1) {
                    var adjustBy = blocks[i].adjust;
                    b = blocks[i].block;
                    if (blocks[i].block !== space.block.page) {
                        b.background = adjustColor(k, adjustBy, 'percent');
                    }
                    adjustForegroundColors(b);
                    makeHoverBlock(b);
                }
            };
        ///////////////////////////////////////////////////////////////
        //'monochrome'
        if (schemeName === arrSchemeNames[0]) {
            blocks = [
                {'block': space.block.high,      'adjust': {h:0, s:-30,  l:60}},
                {'block': space.block.normal,    'adjust': {h:0, s:-30,  l:75}},
                {'block': space.block.low,       'adjust': {h:0, s:-30,  l:80}},
                {'block': space.block.page,      'adjust': {h:0, s:0,    l:0}},
                {'block': space,                 'adjust': {h:0, s:-30,  l:90}}
            ],
            setColorsPerBlock(blocks);

        ///////////////////////////////////////////////////////////////
        //'color-plus-gray'
        } else if (schemeName === arrSchemeNames[1]) {
            blocks = [
                {'block': space.block.high,      'adjust': {h:0, s:-99,  l:60}},
                {'block': space.block.normal,    'adjust': {h:0, s:-99,  l:75}},
                {'block': space.block.low,       'adjust': {h:0, s:-99,  l:80}},
                {'block': space,                 'adjust': {h:0, s:-99,  l:90}}
            ],
            setColorsPerBlock(blocks);

        ///////////////////////////////////////////////////////////////
        //'complimentary'
        } else if (schemeName === arrSchemeNames[2]) {
            blocks = [
                {'block': space.block.high,      'adjust': {h:180, s:-40,  l:30}},
                {'block': space.block.normal,    'adjust': {h:180, s:-40,  l:70}},
                {'block': space.block.low,       'adjust': {h:180, s:-40,  l:80}},
                {'block': space,                 'adjust': {h:180, s:-30,  l:90}}
            ],
            setColorsPerBlock(blocks);

        ///////////////////////////////////////////////////////////////
        //'dark-complimentary'
        } else if (schemeName === arrSchemeNames[3]) {
            blocks = [
                {'block': space.block.high,      'adjust': {h:180, s:-50,  l:-30}},
                {'block': space.block.normal,    'adjust': {h:180, s:-50,  l:-50}},
                {'block': space.block.low,       'adjust': {h:180, s:-50,  l:-60}},
                {'block': space,                 'adjust': {h:0,   s:-40,  l:-70}}
            ],
            setColorsPerBlock(blocks);
        }
    },

    // This runs loops through each color scheme, running it's code
    // to update the color space
    // It sets the swatches in the color scheme radio controls
    // It does NOT send colors to the widget css by handlebars
    //
    updateSchemePreviews = function() {

        // arrSchemeNames is defined in space-schemes.js
        var i,
            schemeChoices = Y.all('.scheme-radios .pick');

        for (i = 0; i < arrSchemeNames.length; i+=1) {
            setColors(arrSchemeNames[i]);
            schemeChoices.item(i).one('.swatches li:nth-child(1)').setStyle('backgroundColor', space.block.highest.background);
            schemeChoices.item(i).one('.swatches li:nth-child(2)').setStyle('backgroundColor', space.block.high.background);
            schemeChoices.item(i).one('.swatches li:nth-child(3)').setStyle('backgroundColor', space.block.normal.background);
            schemeChoices.item(i).one('.swatches li:nth-child(4)').setStyle('backgroundColor', space.block.low.background);

        }
    };

    function doHandlebars() {
        var Skin = Y.Skin;

        // creates the CSS style block for each widget
        var stylesheet,
            styleSheetOutput = document.getElementById('textarea-style'),
            template,
            result,
            pageBackgroundComment = '/* This skin was designed to have this page background color \nhtml {\n    background-color: ' + Y.Skin.KEY_COLOR.page + ';\n}*/\n',
            i,
            widgets = [
                {'id': 'calendar',      'templateFileName': Skin.calendar},
                {'id': 'tabview',       'templateFileName': Skin.tabview},
                {'id': 'button',        'templateFileName': Skin.button},
                {'id': 'datatable',     'templateFileName': Skin.datatable},
                {'id': 'scrollview',    'templateFileName': Skin.scrollview},
                {'id': 'autocomplete',  'templateFileName': Skin.autocomplete},
                {'id': 'dial',          'templateFileName': Skin.dial},
                {'id': 'nodeMenunav',   'templateFileName': Skin.nodeMenunav},
                {'id': 'overlay',       'templateFileName': Skin.overlay},
                {'id': 'panel',         'templateFileName': Skin.panel},
                {'id': 'slider',        'templateFileName': Skin.slider},
                {'id': 'space',         'templateFileName': Skin.space}
            ];
        // creates the style block if not null to receive the result from the handlebars substitution
        // of Space -> Widget Skin Map + Widget Template -> Style block
        if (document.getElementById('calendar-style') === null){
            for (i = 0; i < widgets.length; i += 1) {
                stylesheet = document.documentElement.appendChild(document.createElement('style'));
                stylesheet.setAttribute('id', widgets[i].id + '-style', 0);
            }
        }

        // does the handlebars substitution from Widget Skin Map -> Widget Stylesheet
        styleSheetOutput.value = "";
        for (i = 0; i < widgets.length; i += 1) {
            template = Y.Handlebars.compile(document.getElementById(widgets[i].id + '-template').innerHTML);
            result = pageBackgroundComment + template(widgets[i].templateFileName);
            stylesheet = document.getElementById(widgets[i].id + '-style');
            stylesheet.innerHTML = result;
            styleSheetOutput.value += result;
        }
    }

    // this runs the code for the correct scheme
    // sets the page background color
    // updates the widgetSkinMaps
    // runs the handlebars for substituting the new colors into the CSS
    updateColors = function() {
        var Skin = Y.Skin;

        //Y.log("hit updateColors");
        updateSchemePreviews();

        // function found in space-schemes.js
        // sets all colors in the cSpace literal with relationships from a few key colors
        setColors(schemeName);
        // also set background-color of <html>
        Y.one('.page-background').setStyle('backgroundColor', Y.Skin.KEY_COLOR.page);

        // after setColors() sets all cspce color relationships
        // the "widgetSkinMaps" need to be refreshed with correct values from the cspace
        // example:
        // selectedText:       space.block.highest.text.normal,
        Skin.refreshButtonSkin();    // skin-button.js
        Skin.refreshTabviewSkin();   // skin-tabview.js
        Skin.refreshCalendarSkin();  // skin-calendar.js
        Skin.refreshDatatableSkin(); // skin-datatable.js
        Skin.refreshScrollviewSkin(); // skin-scrollview.js
        Skin.refreshAutocompleteSkin(); // skin-autocomplete.js
        Skin.refreshDialSkin(); // skin-dial.js
        Skin.refreshNodeMenunavSkin();  // skin-node-menunav.js
        Skin.refreshOverlaySkin(); // skin-overlay.js
        Skin.refreshPanelSkin(); // skin-panel.js
        Skin.refreshSliderSkin(); // skin-slider.js

        Skin.refreshSpaceSkin();     // skin-space.js

        // runs the code that does the handlebars replacements in the "Stylesheet Templates"   (.css section above in this file)
        // example:
        // <style>
        // .yui3-button-selected {
        //      color: {{selectedText}};
        // }
        // {{variableName}} from widgetSkinMaps are replaced by values in widgetSkinMap
        doHandlebars();
    };
    updateColors();         // initialize
    updateSchemePreviews(); // initialize


    // END  color schemes and foreground color gen ////////////////////////////////////////////////




    // For UI display only /////////////////////////////////////////////////////
    // dynamically add gradient divs to color space
    // and add text in all blocks that match their unique classnames
    var cspaceUnits = Y.all('.color-space div'),
        i = 0;
    for (i = 0; i < cspaceUnits.size(); i+=1) {
        var me = cspaceUnits.item(i),
            cName = me.get('className'),
            gName = '';

        cName = cName.replace(/block\s/g, "");
        cName = cName.replace(/text\s/g, "");
        cName = cName.replace(/rule\s/g, "");

        // don't add classnames to these
        if (
                (me.hasClass('bucket')) ||
                (me.hasClass('close'))
        ){
            // do nothing
        } else if (me.hasClass('block')) {
            me.prepend('<span class="label-block">' + cName + '</span>');   // text label equal to className
            if (cName.charAt(9) === " "){  //it's a level 1 such as class="block b-l ..."
                var post = cName.slice(7, 9);
//                gName = 'g' + post;
//                alert('l1...cName: ' + cName + '\npost: ' + post + '\nnew: ' + gName);

            } else if (cName.charAt(13) === " ") {  //it's a level 2 such as class="block b-l-b-n ..."
                var pre = cName.slice(6, 10),
                    post = cName.slice(11, 13);
//                gName = pre + 'g' + post;
//                alert('l2...cName: ' + cName + '\npre: ' + pre + '\npost: ' + post + '\nnew: ' + gName);
            }
            me.append('<div class="gradient"><div class="label-grad ' + gName + '">' + gName + '</div></div>');
        }else{
            me.prepend('<span class="label">' + cName + '</span>');
        }
    }

    /**
     * Begin adding instances of widgets to be colored by this tool
     * These are for UI display
     */
    // Create a new instance of Calendar,    ////////////////////////////////////////////
    //setting its width
    // and height, allowing the dates from the previous
    // and next month to be visible and setting the initial
    // date to be November, 1982.
    var calendar = new Y.Calendar({
          contentBox: "#mycalendar",
//          height:'200px',
//          width:'600px',
          showPrevMonth: true,
          showNextMonth: true,
          date: new Date(1982,11,1)}).render();
    // make a day selected for display
    var days = Y.all('.yui3-calendar-day');
    days.item(12).addClass('yui3-calendar-day-selected');
    days.item(13).addClass('yui3-calendar-selection-disabled');

    // Instance of tabview  /////////////////////////////////////////////////////////////
    var tabview = new Y.TabView({
        srcNode: '#tabview',
        width: '250px'
    });

    tabview.render();

    // Disabled button //////////////////////////////////////////////
    // A disabled button
    var disabledButton = Y.one('#myDisabledButton');
    disabledButton.plug(Y.Plugin.Button, {
        disabled: true
    });


    // Datatable instance ///////////////////////////////////////////////////////
    var cols = [
        {key:"Company", label:"Sortable", sortable:true},
        {key:"Phone", label:"Not Sortable"},
        {key:"Contact", label:"Sortable", sortable:true}
    ],
    data = [
        {Company:"Cabs", Phone:"415-555-1234", Contact:"Smith, S."},
        {Company:"Acme", Phone:"650-555-4444", Contact:"Jones, J."},
        {Company:"Washers", Phone:"408-555-5678", Contact:"Ward, R."}
    ],
    table = new Y.DataTable({
        columns: cols,
        data   : data,
        summary: "Contacts list",
        caption: "Table with simple column sorting"
    }).render("#datatable");

    // Scrollview instance ///////////////////////////////////////////////////
    var scrollView = new Y.ScrollView({
        id: "scrollview",
        srcNode: '#scrollview-content',
        height: 200,
        width: 200,
        flick: {
            minDistance:10,
            minVelocity:0.3,
            axis: "x"
        }
    });
    scrollView.render();

    var scrollViewX = new Y.ScrollView({
        id: "scrollview",
        srcNode: '#scrollview-content-horiz',
        //height: 100,
        width: 200,
        flick: {
            minDistance:10,
            minVelocity:0.3,
            axis: "x"
        }
    });
    scrollViewX.render();

    // Autocomplete instance ////////////////////////////////////////////////////
    var states = [     'Alabama',     'Alaska',     'Arizona',     'Arkansas',     'California',     'Colorado',     'Connecticut',     'Delaware',     'Florida',     'Georgia',     'Hawaii',     'Idaho',     'Illinois',     'Indiana',     'Iowa',     'Kansas',     'Kentucky',     'Louisiana',     'Maine',     'Maryland',     'Massachusetts',     'Michigan',     'Minnesota',     'Mississippi',     'Missouri',     'Montana',     'Nebraska',     'Nevada',     'New Hampshire',     'New Jersey',     'New Mexico',     'New York',     'North Dakota',     'North Carolina',     'Ohio',     'Oklahoma',     'Oregon',     'Pennsylvania',     'Rhode Island',     'South Carolina',     'South Dakota',     'Tennessee',     'Texas',     'Utah',     'Vermont',     'Virginia',     'Washington',     'West Virginia',     'Wisconsin',     'Wyoming'   ];
    Y.one('#ac-input').plug(Y.Plugin.AutoComplete, {
        resultFilters    : 'phraseMatch',
        resultHighlighter: 'phraseMatch',
        source           : states
    });

    // Dial instance ////////////////////////////////////////////////////////////
    var dial = new Y.Dial({
        min:-220,
        max:220,
        stepsPerRevolution:100,
        value: 30
    });
    dial.render('#dial');

    // Node Menunav instance /////////////////////////////////////////////////
    var menu = Y.one("#node-menunav");
    menu.plug(Y.Plugin.NodeMenuNav);

    var menuSplit = Y.one("#node-menunav-split");
    //menuSplit.plug(Y.Plugin.NodeMenuNav);
    menuSplit.plug(Y.Plugin.NodeMenuNav, { autoSubmenuDisplay: false, mouseOutHideDelay: 0 });

    // Overlay instance /////////////////////////////////////////////////////
    var overlay = new Y.Overlay({
        // Specify a reference to a node which already exists
        // on the page and contains header/body/footer content
        srcNode:"#overlayContent",

        // Also set some of the attributes inherited from
        // the base Widget class.
        visible:true,
        headerContent:"My Overlay Header",
        bodyContent:"My Overlay Body",
        footerContent:"My Footer Content",
        //xy:[300, 300],
        width: 200
    });
    overlay.render();
    var menuSplitNode = Y.one('#node-menunav-split');
    overlay.move([menuSplitNode.getX(),  menuSplitNode.get('region').bottom + 150] );

    // Panel instance ////////////////////////////////////////////////////////
    var panel = new Y.Panel({
        srcNode      : '#panelContent',
        headerContent: 'Add A New Product',
        width        : 250,
        zIndex       : 5,
        centered     : false,
        modal        : false,
        visible      : true,
        render       : true,
        plugins      : [Y.Plugin.Drag]
    });
    panel.addButton({
        value  : 'Add Item',
        section: Y.WidgetStdMod.FOOTER,
        action : function (e) {
            e.preventDefault();
            addItem();
        }
    });
    var overlayNode = Y.one('#overlayContent');
    panel.move([overlayNode.getX(),  overlayNode.get('region').bottom + 50] );

    // Slider instance ///////////////////////////////////////////////////////////
    var report = Y.one('#slider-report'),
        slider = new Y.Slider({
            //axis  : 'y',
            length: '350px',
            min   : 10,
            max   : 218,
            value : 136,
        //    minorStep: 3,
            after : {
                valueChange: function (e) {
                    report.setHTML(e.newVal);
                }
            }
        });
    slider.render('#slider');

    // End of adding instances of widgets to be colored by this tool
    /////////////////////////////////////////////////////////////////


    // slider for radius changing in the UI ///////////////////////////////////

    var radiusDefaultValue = 10,
        sliderRadius = new Y.Slider({
        axis  : 'x',
        length: '200px',
        min   : 0,
        max   : 40,
        value : radiusDefaultValue,
    //    minorStep: 3,
        after : {
            valueChange: function (e) {
                //report.setHTML(e.newVal);
                space.radius = e.newVal;
                updateColors();
            }
        }
    });

    sliderRadius.render('#slider-radius');
    Y.one('.reset-radius').on('click', function() {
        sliderRadius.set('value', radiusDefaultValue);
    });
    // end slider for radius ///////////////////////////


    // slider for padding changing in the UI ///////////////////////////////////
    var paddingDefaultValue = 50,
        sliderPadding = new Y.Slider({
        axis  : 'x',
        length: '200px',
        min   : 0,
        max   : 200,
        value : paddingDefaultValue,
//        minorStep: 0.1,
        after : {
            valueChange: function (e) {
                //Y.log(e.newVal / 50);
                //report.setHTML(e.newVal);
                space.padding = e.newVal / 50;
                updateColors();
                overlay.move([menuSplitNode.getX(),  menuSplitNode.get('region').bottom + 50] );
                panel.move([overlayNode.getX(),  overlayNode.get('region').bottom + 50] );

            }
        }
    });

    sliderPadding.render('#slider-padding');
    Y.one('.reset-padding').on('click', function() {
        sliderPadding.set('value', paddingDefaultValue);
    });
    // end slider for padding ///////////////////////////


    //////////////////////////////////////////////////////////////////////////
    // Color scheme changer //////////////////////////////////////////////////

    /* this checks background-color of page (in space) and checks to see if
     * it's appropriate for the choosen color scheme, if not it changes to
     * either white or black
     */
    var handleSchemeChangePageColor = function(schemeName) {
        //
        //alert('Y.Skin.KEY_COLOR.page: ' + Y.Skin.KEY_COLOR.page);
        var hsl = hexToHsl(Y.Skin.KEY_COLOR.page);
        if (schemeName.indexOf('dark') > -1) {
            if (hsl[2] > 50) {
                // dark scheme, but light page color
                Y.Skin.KEY_COLOR.page = '#000000';
            }
        } else if (hsl[2] <= 50){
                // not a dark scheme, but dark page color
                Y.Skin.KEY_COLOR.page = '#ffffff';
        }
    };

    // listener for scheme changing radios
    Y.one('.scheme-radios').delegate('click', function(){
        var radios = Y.all('.scheme-radios input');
        schemeName = this.get('id');
        handleSchemeChangePageColor(schemeName); // change page background-color if needed
        updateColors();
        radios.set('checked', false);
        this.set('checked', true);
    }, 'input');




    ///////////////////////////  Color Picker instance and handlers  /////////////////////////////////
    var xy = [40, 40];
    var overlayPicker = new Y.Overlay({
        srcNode:"#picker-outer",
        width:"13em",
        height:"10em",
        xy: [-800, 200]
    });
    overlayPicker.render();

    var ddPicker = new Y.DD.Drag({
        node: '#picker-outer'
    });

    var hsDot = new Y.DD.Drag({
        node: '#hs-dot'
    }).plug(Y.Plugin.DDConstrained, {
        constrain2node: '#hs'
    });

    var lightHandle = new Y.DD.Drag({
        node: '#sliderL-line'
    }).plug(Y.Plugin.DDConstrained, {
        constrain2node: '#sliderL'
    });

        // set the picker outer box ready for drag by grip
        var pickerOuter = Y.one('#picker-outer');
        pickerOuter.plug(Y.Plugin.Drag);

        //Now you can only drag it from the .grip at the top of the blue box
        pickerOuter.dd.addHandle('#picker-outer .grip');


    var pickerH = 0,
        pickerS = 50,
        pickerL = 50,
        objBucket = Y.one('.bucket-highest');

        /* this updates the color swatch in the picker
        * and the hex input control when contol*/
    var pickerUpdateColors = function(objBucket){
            var hsl = Y.Color.fromArray([pickerH, pickerS, pickerL], Y.Color.TYPES.HSL),
            hex = Y.Color.toHex(hsl);

            // depending on which bucket was clicked
            // change either the key color or the page background color
            if (objBucket.hasClass('page-background')) {
                Y.Skin.KEY_COLOR.page = hex;
            } else if (objBucket.hasClass('bucket-highest')) {
                Y.Skin.KEY_COLOR.block.highest.background = hex;
            }
            updateColors();

            Y.one('.picker-swatch').setStyles({'backgroundColor': hex});
            Y.one('.picker-swatch .picker-input').set('value', hex);
        };

    var handlePickerTextInput = function(e) {
        var hex = Y.one('.picker-input').get('value');
        if (objBucket.hasClass('page-background')) {
            Y.Skin.KEY_COLOR.page = hex;
        } else if (objBucket.hasClass('bucket-highest')) {
            Y.Skin.KEY_COLOR.block.highest.background = hex;
        }
        updateColors();

        Y.one('.picker-swatch').setStyles({'backgroundColor': hex});
        //Y.one('.picker-swatch .picker-input').set('value', hex);
    };
    Y.one('.picker-swatch .picker-input').on('blur', handlePickerTextInput);


    var handlePicker = function(e) {
        var relX = (e.clientX - e.currentTarget.getX() + Y.one('document').get('scrollLeft')),
            relY = (e.clientY - e.currentTarget.getY() + Y.one('document').get('scrollTop'));

        pickerH = relX * 2; // hue sat image in picker is 180 px wide. 2 * 180 = range of 0 to 360 for hue
        pickerS = 100 -( relY / 180) * 100; // sat range is 0 to 100
        Y.one('#hs-dot').setStyles({'top': relY + 'px', 'left': relX + 'px'});

        pickerUpdateColors(objBucket);
    };
    var handleLight = function(e) {
        pickerL = 100 - ((e.clientY - e.currentTarget.getY() + Y.one('document').get('scrollTop')) / 180) * 100; // lightness range is 0 to 100
        Y.one('#sliderL-line').setStyle('top', (e.clientY - e.currentTarget.getY() + Y.one('document').get('scrollTop')) + 'px');
        pickerUpdateColors(objBucket);
    };
    var showPicker = function(e) {
        var relX = (e.clientX + Y.one('document').get('scrollLeft')),
            relY = (e.clientY + Y.one('document').get('scrollTop')),
            bucketHex,
            hsl;


        // For case of multiple buckets to click on
        // we need to update the color picker display
        // on picker show
        // also set the var objBucket, which is the DOM obj to receive the new color
        if (e.currentTarget.hasClass('bucket-page')) {
            objBucket = Y.one('.page-background');
            bucketHex = Y.Skin.KEY_COLOR.page;
        } else if (e.currentTarget.hasClass('bucket-highest')){
            objBucket = e.currentTarget;
            bucketHex = space.block.highest.background;
        }
        Y.one('.picker-swatch .picker-input').set('value', bucketHex);

        // set UI to match color of bucket value clicked on
        hsl = Y.Color.toArray(Y.Color.toHSL(bucketHex));
        Y.one('#hs-dot').setStyles({'left': hsl[0] / 2, 'top': 180 - (hsl[1] / 100) * 180});
        Y.one('#sliderL-line').setStyle('top', 180 - ((hsl[2] / 100) * 180));
        Y.one('.picker-swatch').setStyle('backgroundColor', bucketHex);
        // set all of the values that are used in pickerUpdateColors()
        // so it will be ready to take a click, either h&s  or l
        pickerH = hsl[0];
        pickerS = hsl[1];
        pickerL = hsl[2];

        overlayPicker.show();
        overlayPicker.move([(relX + 250), (relY - 10)]);

    };
    var handlePickerInputBlur = function(e) {
        var hsl = hexToHsl(Y.Escape.html(e.currentTarget.get('value')));

        pickerH = hsl[0];
        pickerS = hsl[1];
        pickerL = hsl[2];
        pickerUpdateColors(objBucket);

    };

    //  Twisty  ////////////////////////////////////////////////////////////////////////////////
    // Expand/collapse the sub-items in the color space boxes
    var handleTwisty = function(e){
            var cspaceDivs = Y.one('.color-space').all('div'),
                twisty = Y.one('.twisty');

            // just for initial twisty expand while testing
            if (typeof(e) === 'undefined') {
                twisty.addClass('twisty-expand');
                cspaceDivs.setStyle('display', 'block');
                twisty.setAttribute('title', 'Collapse Color Palette');
            }

            if (e.currentTarget.hasClass('twisty-expand')) {
                twisty.removeClass('twisty-expand');
                cspaceDivs.setStyle('display', 'none');
                Y.one('.color-space .background').setStyle('display', 'block');
                Y.one('.color-space .background .text-normal').setStyle('display', 'block');
                Y.one('.color-space .block-low').setStyle('display', 'block');
                Y.one('.color-space .block-low-text-normal').setStyle('display', 'block');
                Y.one('.color-space .block-normal').setStyle('display', 'block');
                Y.one('.color-space .block-normal-text-normal').setStyle('display', 'block');
                Y.one('.color-space .block-high').setStyle('display', 'block');
                Y.one('.color-space .block-high-text-normal').setStyle('display', 'block');
                Y.one('.color-space .block-highest').setStyle('display', 'block');
                Y.one('.color-space .block-highest-text-normal').setStyle('display', 'block');
                Y.all('.bucket').setStyle('display', 'block');
                twisty.setAttribute('title', 'Show Full Color Palette');
            } else {
                twisty.addClass('twisty-expand');
                cspaceDivs.setStyle('display', 'block');
                twisty.setAttribute('title', 'Collapse Color Palette');
            }

        };


    Y.one('.twisty').on('click', handleTwisty);
    Y.one('#hs').on('click', handlePicker);
    Y.one('#sliderL').on('click', handleLight);
    Y.one('.picker-input').on('blur', handlePickerInputBlur);
    Y.one('.close').on('click', function(e){
        overlayPicker.hide();
    });


// for testing only
//    setTimeout(handleTwisty, 2000);

    Y.one('.inp-skin-name').on('blur', function(e) {
        var body = Y.one('body');
        // sets the skin name and class prefix that will be replaced in all the
        // stylesheet templates
        space.skin.name = Y.Escape.html(Y.one('.inp-skin-name').get('value'));
        body.setAttribute('class', '');
        body.addClass(space.skin.prefix.substring(1) + 'skin-' + space.skin.name);

        // Then we need to do refresh[component]Skin() function calls
        // Which are found in updateColors();
        // This will send the skin name into the Widget Maps -> Stylesheet Templates -> CSS
        updateColors();
    });

    Y.all('.bucket').on('click', showPicker);
    Y.one('.page-background').setStyle('backgroundColor', Y.Skin.KEY_COLOR.page);


    Y.one('.block.background').on('mouseenter', function(e){
        e.target.addClass('show-hover');
    });
    Y.one('.block.background').on('mouseout', function(e){
        e.target.removeClass('show-hover');
    });
});
