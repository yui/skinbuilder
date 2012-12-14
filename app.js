YUI({
    modules: {
        'skin'       : 'skin.js',
        'colorspace'       : 'colorspace.js',
        'colorspace-schemes'       : 'colorspace-schemes.js',
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

        'skinner': {
            use: [
                'skin', 'colorspace-schemes', 'skin-autocomplete', 'skin-button',
                'skin-calendar', 'skin-datatable', 'skin-dial',
                'skin-node-menunav', 'skin-overlay', 'skin-panel',
                'skin-scrollview', 'skin-tabview'
            ]
        }
    }
}).use(
    'skinner', 'handlebars',
    'slider', 'overlay', 'panel', 'node-menunav', 'dial', 'autocomplete',
    'autocomplete-filters', 'autocomplete-highlighters', 'scrollview',
    'datatable-sort', 'dd-drag', 'dd-constrain', 'calendar', 'button-plugin',
    'tabview', 'datatype-date', 'button-group', 'cssbutton',
    'node-event-delegate', 'overlay', 'color',
function (Y) {

    var PAGE_BG_COLOR = '#fff',
        schemeName = 'monochrome', // default schemeName
        schemeNames = Y.Object.keys(Y.ColorSpace.schemes),
        Skin = Y.Skin,

        colorspace = new Y.ColorSpace({
            name: 'bulue monochrome',
            scheme: schemeName,
            keycolor: '#3355BA'
        }),

        space = colorspace.getData(),

        SKIN = new Y.Skin({
            name: 'mine',
            scheme: 'monochrome',
            color: '#3355BA',
            containerColor: '#000'
        }),

        TEMPLATES = {},
        DATA = {};

    console.log(space);

    function hexToHsl(hexInput) {
        var hslStr = Y.Color.toHSL(hexInput),
            hslArr = Y.Color.toArray(hslStr);

        return hslArr;
    }


    Y.Object.each(Y.Skin.renderers, function(fn, name) {
        TEMPLATES[name] = document.getElementById(name + '-template').innerHTML;
    });


    // This runs loops through each color scheme, running it's code
    // to update the color space
    // It sets the swatches in the color scheme radio controls
    // It does NOT send colors to the widget css by handlebars
    //
    function updateSchemePreviews() {
        var i,
            schemeChoices = Y.all('.scheme-radios .pick');

        for (i = 0; i < schemeNames.length; i+=1) {
            schemeChoices.item(i).one('.swatches li:nth-child(1)').setStyle('backgroundColor', space.block.highest.background);
            schemeChoices.item(i).one('.swatches li:nth-child(2)').setStyle('backgroundColor', space.block.high.background);
            schemeChoices.item(i).one('.swatches li:nth-child(3)').setStyle('backgroundColor', space.block.normal.background);
            schemeChoices.item(i).one('.swatches li:nth-child(4)').setStyle('backgroundColor', space.block.low.background);

        }
    }

    function doHandlebars() {
        // creates the CSS style block for each widget
        var stylesheet,
            styleSheetOutput = document.getElementById('textarea-style'),
            template,
            result,
            i,
            widgets = [
//                {'id': 'calendar',      'templateFileName': Skin.calendar},
                {'id': 'tabview',       'templateFileName': Skin.tabview},
/*
                {'id': 'button',        'templateFileName': Skin.button},
                {'id': 'datatable',     'templateFileName': Skin.datatable},
                {'id': 'scrollview',    'templateFileName': Skin.scrollview},
                {'id': 'autocomplete',  'templateFileName': Skin.autocomplete},
                {'id': 'dial',          'templateFileName': Skin.dial},
                {'id': 'nodeMenunav',   'templateFileName': Skin.nodeMenunav},
                {'id': 'overlay',       'templateFileName': Skin.overlay},
                {'id': 'panel',         'templateFileName': Skin.panel},
                {'id': 'space',         'templateFileName': Skin.space}
*/
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
            template = TEMPLATES[widgets[i].id];
            result = SKIN.render(widgets[i].id, template);
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
        //setColors(schemeName);
        // also set background-color of <html>
        Y.one('.page-background').setStyle('backgroundColor', PAGE_BG_COLOR);

        // after setColors() sets all cspce color relationships
        // the "widgetSkinMaps" need to be refreshed with correct values from the cspace
        // example:
        // selectedText:       space.block.highest.text.normal,
        //Skin.refreshButtonSkin();    // skin-button.js
        DATA.tabview = SKIN.render('tabview', TEMPLATES.tabview);   // skin-tabview.js
        /*
        Skin.refreshCalendarSkin();  // skin-calendar.js
        Skin.refreshDatatableSkin(); // skin-datatable.js
        Skin.refreshScrollviewSkin(); // skin-scrollview.js
        Skin.refreshAutocompleteSkin(); // skin-autocomplete.js
        Skin.refreshDialSkin(); // skin-dial.js
        Skin.refreshNodeMenunavSkin();  // skin-node-menunav.js
        Skin.refreshOverlaySkin(); // skin-overlay.js
        Skin.refreshPanelSkin(); // skin-panel.js

        Skin.refreshSpaceSkin();     // skin-space.js
        */

        // runs the code that does the handlebars replacements in the "Stylesheet Templates"   (.css section above in this file)
        // example:
        // <style>
        // .yui3-button-selected {
        //      color: {{selectedText}};
        // }
        // {{variableName}} from widgetSkinMaps are replaced by values in widgetSkinMap
        doHandlebars();
    };
    updateColors();
    updateSchemePreviews();


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
        //alert('PAGE_BG_COLOR: ' + PAGE_BG_COLOR);
        var hsl = hexToHsl(PAGE_BG_COLOR);
        if (schemeName.indexOf('dark') > -1) {
            if (hsl[2] > 50) {
                // dark scheme, but light page color
                PAGE_BG_COLOR = '#000000';
            }
        } else if (hsl[2] <= 50){
                // not a dark scheme, but dark page color
                PAGE_BG_COLOR = '#ffffff';
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
                PAGE_BG_COLOR = hex;
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
            PAGE_BG_COLOR = hex;
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
            bucketHex = PAGE_BG_COLOR;
        } else if (e.currentTarget.hasClass('bucket-highest')){
            objBucket = e.currentTarget;
            bucketHex = space.block.highest.background;
        }
        Y.one('.picker-swatch .picker-input').set('value', bucketHex);

        // set UI to match color of bucket value clicked on
        hsl = Y.Color.toArray(Y.Color.toHSL(bucketHex));
        Y.one('#hs-dot').setStyles({'left': hsl[0] / 2, 'top': (hsl[1] / 100) * 180});
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
//    setTimeout(handleTwisty, 1000);

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
    Y.one('.page-background').setStyle('backgroundColor', PAGE_BG_COLOR);


    Y.one('.block.background').on('mouseenter', function(e){
        e.target.addClass('show-hover');
    });
    Y.one('.block.background').on('mouseout', function(e){
        e.target.removeClass('show-hover');
    });
});
