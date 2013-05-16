// TODO:
// - Break out sample widgets into separate module.
// - Convert input handling and Picker to OO-style.

YUI({
    comboBase: 'https://yui-s.yahooapis.com/combo?',
    combine: true,
    logInclude: { TestRunner: true },
    filter: 'raw',
    modules: {
        'skin'             : 'js/skin.js',
        'colorspace'       : 'js/colorspace.js',
        'colorspace-schemes'       : 'js/colorspace-schemes.js',
        'skin-autocomplete': 'js/skin-autocomplete.js',
        'skin-button'      : 'js/skin-button.js',
        'skin-calendar'    : 'js/skin-calendar.js',
        'skin-datatable'   : 'js/skin-datatable.js',
        'skin-dial'        : 'js/skin-dial.js',
        'skin-node-menunav': 'js/skin-node-menunav.js',
        'skin-overlay'     : 'js/skin-overlay.js',
        'skin-panel'       : 'js/skin-panel.js',
        'skin-scrollview'  : 'js/skin-scrollview.js',
        'skin-slider'      : 'js/skin-slider.js',
        'skin-space'       : 'js/skin-space.js',
        'skin-tabview'     : 'js/skin-tabview.js',

        // begin YUICSS
        'skin-form'        : 'js/skin-form.js',
        'skin-table'       : 'js/skin-table.js',
        'skin-list'        : 'js/skin-list.js',

        'skinner': {
            use: [
                'skin', 'colorspace-schemes', 'skin-autocomplete', 'skin-button',
                'skin-calendar', 'skin-datatable', 'skin-dial',
                'skin-node-menunav', 'skin-overlay', 'skin-panel',
                'skin-scrollview', 'skin-slider', 'skin-tabview',
                'skin-form', 'skin-table', 'skin-list'
            ]
        }
    }
}).use(
    'skinner', 'handlebars',
    'slider', 'overlay', 'panel', 'node-menunav', 'dial', 'autocomplete',
    'autocomplete-filters', 'autocomplete-highlighters', 'scrollview',
    'datatable-sort', 'dd-drag', 'dd-constrain', 'calendar', 'button-plugin',
    'tabview', 'datatype-date', 'button-group', 'cssbutton',
    'node-event-delegate', 'overlay', 'color', 'test', 'test-console', 'event-outside',
    'querystring', 'datatype-number',
function (Y) {

    var PAGE_BG_COLOR = '#ffffff',
        KEY_COLOR = {
            page: PAGE_BG_COLOR,
            background: '#ffffff',
            block: {
                low: {},
                normal: {},
                high: {
                    background: ''
                },
                highest: {
                    background: '#3355BA'
                }
            }
        },

        SCHEME_NAME = 'monochrome', // default schemeName
        SCHEME_NAMES = Y.Object.keys(Y.ColorSpace.schemes),

        SCHEME_CUSTOM = {
            high: {h:0, s:-30, l:60},
            normal: {h:0, s:-30, l:75},
            low: {h:0, s:-30,  l:80},
            background: {h:0, s:-30,  l:90}
        },


        STYLESHEET, // = document.documentElement.appendChild(document.createElement('style')),

        SKIN = new Y.Skin({
            name: 'mine',
            scheme: SCHEME_NAME,
            keycolor: KEY_COLOR.block.highest.background,
            container: PAGE_BG_COLOR
        }),


        TEMPLATES_USED = [
                {
                    name: 'autocomplete',
                    display: true,
                    type: 'widget'
                },
                {
                    name: 'button',
                    display: true,
                    type: 'widget'
                },
                {
                    name: 'calendar',
                    display: true,
                    type: 'widget'
                },
                {
                    name: 'datatable',
                    display: true,
                    type: 'widget'
                },
                {
                    name: 'dial',
                    display: true,
                    type: 'widget',
                    required: true   ///////
                },
                {
                    name: 'nodeMenunav',
                    display: false,
                    type: 'widget'
                },
                {
                    name: 'overlay',
                    display: true,
                    type: 'widget'
                },
                {
                    name: 'panel',
                    display: true,
                    type: 'widget'
                },
                {
                    name: 'scrollview',
                    display: true,
                    type: 'widget'
                },
                {
                    name: 'slider',
                    display: true,
                    type: 'widget',
                    required: true    /////////
                },
                {
                    name: 'tabview',
                    display: true,
                    type: 'widget',
                    required: true   //////////
                }, ///////////////////////////////////// keep YUICSS modules below this line.
                // this is necessary because checkboxes are generated from this array
                // and use the nodelist of checkboxes to find the index back to this array for updating.
                {
                    name: 'form',
                    display: false,
                    type: 'yuicss'
                },
                {
                    name: 'table',
                    display: false,
                    type: 'yuicss'
                },
                {
                    name: 'list',
                    display: false,
                    type: 'yuicss'
                }
            ],

        TEMPLATES = {},
        calendar,
        tabview,
        disabledButton,
        cols,
        data,
        table,
        scrollView,
        states,
        dial,
        menu,
        menuSplit,
        overlay,
        anchorOverlay,
        panel,
        anchorPanel,
        report,
        tabviewControls,
        radiusDefaultValue,
        sliderRadius,
        sliderTextContrast,
        paddingHorizDefaultValue,
        sliderPaddingHoriz,
        paddingVertDefaultValue,
        sliderPaddingVert,
        handleSchemeChangePageColor,
        handleSchemeRadioClick,
        overlayPicker,
        ddPicker,
        hsDot,
        lightHandle,
        pickerH,
        pickerS,
        pickerL,
        objBucket,
        pickerOuter,
        pickerUpdateColors,
        handlePickerTextInput,
        handlePicker,
        handleLight,
        showPicker,
        handlePickerInputBlur,
        schemeOverlayIsReady = false,
        blockAdjust = {h: '', s: '', l: ''}, // the adjust object of the correct block in the SKIN._space
        schemeBlockDOM, // the DOM object of the correct block. Used for updating the swatch on the scheme adjust overlay
        handleSchemeValueChange,
        overlaySchemer,
        ddSchemer,
        keyHue,
        keySat,
        keyLit,
        showSchemer,
        overlayPalette,
        ddPaletteOverlay,
        paletteOuter,
        helpPanelOuter,
        helpPanel,
        ddHelpPanel,
        helpContent = { // Object for storage of help text strings shown in panel when "?" is clicked
            'color-buttons': 'Buttons in the Style tab allow you to change the Master color or the Page background color. '+
                'Changes to the Master color ripple through the whole palette of the skin. '+
                'Changing the Page color will let you see how this skin will look on a background color.',
            'style': 'These sliders control the look of several CSS properties. Check their effect in the Skin Preview below.',
            'schemes': 'Choose from one of these ready-made color schemes, or create your own custom scheme. '+
                '<br><em>Note:</em> Schemes are not hard-coded colors. All the colors in Skin Builder skins are generated '+
                'by offsets from the master color. A scheme is defined by a collection of these offset values.',
            'detailed-preview': 'This displays all the colors used in the current skin. Both :hover and normal colors. '+
                'Clicking on the small color specrum icons allow you to modify the colors.',
            'items': 'Choose which modules or widgets you\'ll be using. We\'ll only generate CSS skin code for those. '+
                'You can copy that code from the Code tab.',
            'code': 'You can change the name of your skin in the input labeled ".yui-skin-". '+
                'Then copy the CSS from this textarea for use in your page/app.',
            'settings': 'This URL will capture all your current skin settings. You can save it somewhere and/or share it.'
        },
        updateBodySkinClass,
        moveAbsolutePosPreviews,
        initPreviewAndModulesCheckboxes,
        handleCreateQueryString,
        runUnitTests,
        setSkinFromQuery,
        isKimono = false;






    function hexToHsl(hexInput) {
        var hslStr = Y.Color.toHSL(hexInput),
            hslArr = Y.Color.toArray(hslStr);

        return hslArr;
    }


    /** Updates the swatches in the UI display of scheme choices
    renders a colorspace for each scheme
    this takes time. Only do this when the Scheme tabview is shown.
    @param {Boolean} custom   true = only render new scheme 'custom' and only update it's preview swatches
                              false or undefined = render all schemes and update all preview swatches
    **/
    function updateSchemePreviews() {
        var i,
            space,
            schemeChoices = Y.all('.scheme-radios .pick');

        for (i = 0; i < SCHEME_NAMES.length; i+=1) {
            space = new Y.ColorSpace({
                scheme: SCHEME_NAMES[i]
            }).render(KEY_COLOR.block.highest.background, SKIN.colorspace.background);
            schemeChoices.item(i).one('.swatches li:nth-child(1)').setStyle('backgroundColor', space.block.highest.background);
            schemeChoices.item(i).one('.swatches li:nth-child(2)').setStyle('backgroundColor', space.block.high.background);
            schemeChoices.item(i).one('.swatches li:nth-child(3)').setStyle('backgroundColor', space.block.normal.background);
            schemeChoices.item(i).one('.swatches li:nth-child(4)').setStyle('backgroundColor', space.block.low.background);
        }
        // custom scheme isn't in the SCHEME_NAMES [], so need to do separately
        // No need to create a new Y.ColorSpace, since Custom should always
        // track the current scheme (even when custom scheme is the current)
        schemeChoices.item(i).one('.swatches li:nth-child(1)').setStyle('backgroundColor', SKIN.colorspace.block.highest.background);
        schemeChoices.item(i).one('.swatches li:nth-child(2)').setStyle('backgroundColor', SKIN.colorspace.block.high.background);
        schemeChoices.item(i).one('.swatches li:nth-child(3)').setStyle('backgroundColor', SKIN.colorspace.block.normal.background);
        schemeChoices.item(i).one('.swatches li:nth-child(4)').setStyle('backgroundColor', SKIN.colorspace.block.low.background);
    }

    function updateCSS() {
        var cssOutput = document.getElementById('textarea-style'), // place from where user copies CSS code
            css = '', // any css code placed in this var goes only to the textarea the user copies CSS code
            cssRequired = '', // any code placed in this var and 'css' var goes to the <style> block that this app uses for UI
            i;

        Y.Object.each(TEMPLATES, function(template, name) {
            if(name === 'space'){
                cssRequired += SKIN.render(name, template);
            } else {
                for (i = 0; i < TEMPLATES_USED.length; i+=1) {
                    if (name === TEMPLATES_USED[i].name) {
                        if(TEMPLATES_USED[i].display) {
                            css += SKIN.render(name, template);
                        } else if(TEMPLATES_USED[i].required){
                            cssRequired += SKIN.render(name, template);
                        }
                        break;
                    }
                }
            }

        });

        cssOutput.value = css;
//        STYLESHEET.innerHTML = cssRequired + css;
//        STYLESHEET.cssText = cssRequired + css;  // from Matt
        if(STYLESHEET){
            Y.one('body').removeChild(STYLESHEET);
        }

        STYLESHEET = Y.Node.create('<style>' + cssRequired + css + '</style>');
        Y.one('body').appendChild(STYLESHEET);




    }

    // this runs the code for the correct scheme
    // sets the page background color
    // updates the widgetSkinMaps
    // substitutes the new colors into the CSS
    function updateColors() {
        SKIN.options.container = PAGE_BG_COLOR;
        if (SCHEME_NAME === 'custom') {
            SKIN.options.scheme = SCHEME_CUSTOM;
        } else {
            SKIN.options.scheme = SCHEME_NAME;
        }
        updateCSS();
        Y.one('.page-background').setStyle('backgroundColor', PAGE_BG_COLOR);
    }

    // Populate TEMPLATES from HTML document.
    Y.Object.each(Y.Skin.renderers, function(fn, name) {
        TEMPLATES[name] = document.getElementById(name + '-template').innerHTML;
    });

    updateColors();

    // END  color schemes and foreground color gen ////////////////////////////////////////////////


    /**
     * Begin adding instances of widgets to be skinned by this tool
     * These are for UI preview display
     */

    // Create a new instance of Calendar,    ////////////////////////////////////////////
    //setting its width
    // and height, allowing the dates from the previous
    // and next month to be visible and setting the initial
    // date to be November, 1982.
    calendar = new Y.Calendar({
          contentBox: "#mycalendar",
//          height:'200px',
//          width:'600px',
          showPrevMonth: true,
          showNextMonth: true,
          date: new Date(1982,11,1)
        });
    calendar.render(),

    // make a day selected for display
    days = Y.all('.yui3-calendar-day');

    days.item(12).addClass('yui3-calendar-day-selected');
    days.item(13).addClass('yui3-calendar-selection-disabled');

    // Instance of tabview  /////////////////////////////////////////////////////////////
    tabview = new Y.TabView({
        srcNode: '#tabview',
        width: '250px'
    });

    tabview.render();

    // Disabled button //////////////////////////////////////////////
    // A disabled button
    disabledButton = Y.one('#myDisabledButton');
    disabledButton.plug(Y.Plugin.Button, {
        disabled: true
    });


    // Datatable instance ///////////////////////////////////////////////////////
    cols = [
        {key:"Company", label:"Sortable", sortable:true},
        {key:"Phone", label:"No Sort"},
        {key:"Contact", label:"Sortable", sortable:true}
    ];

    data = [
        {Company:"Cabs", Phone:"455-1234", Contact:"Smith, S."},
        {Company:"Acme", Phone:"650-4444", Contact:"Jones, J."},
        {Company:"Washers", Phone:"405-5678", Contact:"Ward, R."}
    ];

    table = new Y.DataTable({
        columns: cols,
        data   : data,
        summary: "Contacts list",
        caption: "Table with simple column sorting"
    });
    table.render("#datatable");

    // Scrollview instance Horizontal ///////////////////////////////////////////////////
    // var scrollViewX = new Y.ScrollView({
    //     id: "scrollview",
    //     srcNode: '#scrollview-content-horiz',
    //     //height: 100, // specifying the height is only allowed on a vertical scrollView
    //     width: 300,
    //     flick: {
    //         minDistance:2,
    //         minVelocity:0.1,
    //         axis: "x"
    //     }
    // });
    // scrollViewX.render();

    // Scrollview instance Vertical ///////////////////////////////////////////////////
    scrollView = new Y.ScrollView({
        id: "scrollview",
        srcNode: '#scrollview-content',
        height: 128,
        //width: 300,  specifying the width is only allowed on a horizontal scrollView
        flick: {
            minDistance:5,
            minVelocity:0.3,
            axis: "y"
        }
    });
    scrollView.render();


    // Autocomplete instance ////////////////////////////////////////////////////
    states=['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware',
        'Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky',
        'Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi',
        'Missouri','Montana','Nebraska','Nevada','NewHampshire','NewJersey','NewMexico','NewYork',
        'NorthDakota','NorthCarolina','Ohio','Oklahoma','Oregon','Pennsylvania','RhodeIsland',
        'SouthCarolina','SouthDakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington',
        'WestVirginia','Wisconsin','Wyoming'];

    Y.one('#ac-input').plug(Y.Plugin.AutoComplete, {
        resultFilters    : 'phraseMatch',
        resultHighlighter: 'phraseMatch',
        source           : states
    });

    // Dial instance ////////////////////////////////////////////////////////////
    dial = new Y.Dial({
        min:-220,
        max:220,
        stepsPerRevolution:100,
        value: 30
    });
    dial.render('#dial');

    // Node Menunav instance /////////////////////////////////////////////////
    menu = Y.one("#node-menunav");
    menu.plug(Y.Plugin.NodeMenuNav);

    menuSplit = Y.one("#node-menunav-split");
    //menuSplit.plug(Y.Plugin.NodeMenuNav);
    menuSplit.plug(Y.Plugin.NodeMenuNav, { autoSubmenuDisplay: false, mouseOutHideDelay: 0 });

    // Overlay instance /////////////////////////////////////////////////////
    overlay = new Y.Overlay({
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
    anchorOverlay = Y.one('#anchorOverlay');

    // Panel instance ////////////////////////////////////////////////////////
    panel = new Y.Panel({
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
            //addItem();
        }
    });
    // var overlayNode = Y.one('#overlayContent');
    anchorPanel = Y.one('#anchorPanel');

    // Slider instance ///////////////////////////////////////////////////////////
    report = Y.one('#slider-report'),
        slider = new Y.Slider({
            thumbUrl: 'assets/images/blank_thumb.png',
            length: '280px',
            min   : 10,
            max   : 218,
            value : 136,
            after : {
                valueChange: function (e) {
                    report.setHTML(e.newVal);
                }
            }
        });
    slider.render('#slider');

    // End of adding instances of widgets to be colored by this tool
    /////////////////////////////////////////////////////////////////

    // tabview for holding controls in left grid column //////////////////////////////////
    tabviewControls = new Y.TabView({
        srcNode: '#tabview-controls'
        //width: '285px'
    });

    tabviewControls.render();

    // slider for radius changing in the UI ///////////////////////////////////

    radiusDefaultValue = 10;
    SKIN.options.radius = radiusDefaultValue;
    sliderRadius = new Y.Slider({
        thumbUrl: 'assets/images/blank_thumb.png',
        axis  : 'x',
        length: '200px',
        min   : 0,
        max   : 40,
        value : radiusDefaultValue,
        after : {
            valueChange: function (e) {
                var newVal = e.target.get('value');
                SKIN.options.radius = newVal;
                setTimeout(updateColors, 10);
                Y.one('.slider-markup-border-radius label').setHTML('Border-radius: ' + (newVal * 10) + '%');
            }
        }
    });

    sliderRadius.render('#slider-radius');
    Y.one('.reset-radius').on('click', function() {
        sliderRadius.set('value', radiusDefaultValue);
    });
    // end slider for radius ///////////////////////////




    // slider for text contrast changing in the UI ///////////////////////////////////

    sliderTextContrast = new Y.Slider({
        thumbUrl: 'assets/images/blank_thumb.png',
        axis  : 'x',
        length: '200px',
        min   : 5,
        max   : 30,
        value : SKIN._space.options.textContrast * 10,
        minorStep: 1,
        after : {
            valueChange: function (e) {
                var newVal = e.target.get('value');
                SKIN._space.options.textContrast = newVal / 10; // works
                Y.one('.slider-markup-text-contrast label').setHTML('Text contrast: ' + newVal * 10);
                SKIN.initColorSpace();
                setTimeout(updateColors, 10);
            }
        }
    });

    sliderTextContrast.render('#slider-text-contrast');
    Y.one('.reset-text-contrast').on('click', function() {
        sliderTextContrast.set('value', SKIN.options.defaultTextContrast * 15);
    });
    // end slider for text contrast ///////////////////////////




    // slider for changing Horizontal padding in the UI ///////////////////////////////////
    paddingHorizDefaultValue = 50;
    SKIN.options.paddingHoriz = paddingHorizDefaultValue / 50;
    sliderPaddingHoriz = new Y.Slider({
        thumbUrl: 'assets/images/blank_thumb.png',
        axis  : 'x',
        length: '200px',
        min   : 0,
        max   : 200,
        value : paddingHorizDefaultValue,
        after : {
            valueChange: function (e) {
                var newVal = e.target.get('value');
                SKIN.options.paddingHoriz = newVal / 50;
                setTimeout(updateColors, 10);
                overlay.move([anchorOverlay.getX(),  anchorOverlay.getY()]);
                panel.move([anchorPanel.getX(),  anchorPanel.getY()]);
                Y.one('.slider-markup-horiz-padding label').setHTML('Horiz. padding: ' + (newVal * 2) + '%');

            }
        }
    });

    sliderPaddingHoriz.render('#slider-padding-horiz');

    Y.one('.reset-padding-horiz').on('click', function() {
        sliderPaddingHoriz.set('value', paddingHorizDefaultValue);
    });
    // end slider for Horizontal padding///////////////////////////

    // slider for changing Vertical padding in the UI ///////////////////////////////////
    paddingVertDefaultValue = 50;
    SKIN.options.paddingVert = paddingVertDefaultValue / 50;
    sliderPaddingVert = new Y.Slider({
        thumbUrl: 'assets/images/blank_thumb.png',
        axis  : 'y',
        length: '112px',
        min   : 200,
        max   : 0,
        value : paddingVertDefaultValue,
//        minorStep: 0.1,
        after : {

            valueChange: function (e) {
                //Y.log(e.newVal / 50);
                //report.setHTML(e.newVal);
                var newVal = e.target.get('value');
                SKIN.options.paddingVert = (newVal / 50);
                setTimeout(updateColors, 10);
                overlay.move([anchorOverlay.getX(),  anchorOverlay.getY()]);
                panel.move([anchorPanel.getX(),  anchorPanel.getY()]);
                Y.one('.slider-markup-vert-padding label').setHTML('Vert. padding: ' + (newVal * 2) + '%');
            }
        }
    });

    sliderPaddingVert.render('#slider-padding-vert');

    Y.one('.reset-padding-vert').on('click', function() {
        sliderPaddingVert.set('value', paddingVertDefaultValue);
    });
    // end slider for Vertical padding ///////////////////////////


    //////////////////////////////////////////////////////////////////////////
    // Color scheme changer //////////////////////////////////////////////////

    /* this checks background-color of page (in space) and checks to see if
     * it's appropriate for the choosen color scheme, if not it changes to
     * either white or black
     */
    handleSchemeChangePageColor = function(schemeName) {
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
    handleSchemeRadioClick = function(e){

        var radios = Y.all('.scheme-radios input');
        SCHEME_NAME = e.target.get('id');
        if (SCHEME_NAME === 'custom') {
            Y.all('.bucket-scheme').removeClass('bucket-scheme-hidden');
            overlayPalette.show();
        } else {
            Y.all('.bucket-scheme').addClass('bucket-scheme-hidden');
        }
        handleSchemeChangePageColor(SCHEME_NAME); // change page background-color if needed
        updateColors();

        SCHEME_CUSTOM.background.h = SKIN._space._adjustBG.h;
        SCHEME_CUSTOM.background.s = SKIN._space._adjustBG.s;
        SCHEME_CUSTOM.background.l = SKIN._space._adjustBG.l;

        SCHEME_CUSTOM.high.h = SKIN._space._adjust.high.h;
        SCHEME_CUSTOM.high.s = SKIN._space._adjust.high.s;
        SCHEME_CUSTOM.high.l = SKIN._space._adjust.high.l;

        SCHEME_CUSTOM.normal.h = SKIN._space._adjust.normal.h;
        SCHEME_CUSTOM.normal.s = SKIN._space._adjust.normal.s;
        SCHEME_CUSTOM.normal.l = SKIN._space._adjust.normal.l;

        SCHEME_CUSTOM.low.h = SKIN._space._adjust.low.h;
        SCHEME_CUSTOM.low.s = SKIN._space._adjust.low.s;
        SCHEME_CUSTOM.low.l = SKIN._space._adjust.low.l;

        updateSchemePreviews(); // updates only 'custom' scheme preview swatches to match selected scheme

        radios.set('checked', false);
        e.target.set('checked', true);
    };
    Y.one('.scheme-radios').delegate('click', handleSchemeRadioClick, 'input');



    ///////////////////////////  Color Picker instance and handlers  /////////////////////////////////

    overlayPicker = new Y.Overlay({
        srcNode:"#picker-outer",
        // width:"13em",
        // height:"10em",
        xy: [-800, 200]
    });
    overlayPicker.render();

    ddPicker = new Y.DD.Drag({
        node: '#picker-outer'
    }).plug(Y.Plugin.DDConstrained, {
        constrain: 'view'
    });

    hsDot = new Y.DD.Drag({
        node: '#hs-dot'
    }).plug(Y.Plugin.DDConstrained, {
        constrain: '#hs'
    });

    lightHandle = new Y.DD.Drag({
        node: '#sliderL-line'
    }).plug(Y.Plugin.DDConstrained, {
        constrain: '#sliderL'
    });

    // set the picker outer box ready for drag by grip
    pickerOuter = Y.one('#picker-outer');
    pickerOuter.plug(Y.Plugin.Drag);

    //Now you can only drag it from the .grip at the top of the blue box
    pickerOuter.dd.addHandle('#picker-outer .grip');


    pickerH = 0;
    pickerS = 50;
    pickerL = 50;
    objBucket = Y.one('.bucket-highest');

        /* this updates the color swatch in the picker
        * and the hex input control when contol*/
    pickerUpdateColors = function(objBucket){
            var hsl = Y.Color.fromArray([pickerH, pickerS, pickerL], Y.Color.TYPES.HSL),
            hex = Y.Color.toHex(hsl);

            // depending on which bucket was clicked
            // change either the key color or the page background color
            if (objBucket.hasClass('page-background')) {
                PAGE_BG_COLOR = hex;
                SKIN.options.container = hex;
            } else if (objBucket.hasClass('bucket-highest')) {
                KEY_COLOR.block.highest.background = hex;
                SKIN.options.keycolor = hex;
            }

            // Using async to keep UI snappy.
            Y.config.win.setTimeout(updateColors, 20);

            Y.one('.picker-swatch').setStyles({'backgroundColor': hex});
            Y.one('.picker-swatch .picker-input').set('value', hex);
        };

    handlePickerTextInput = function() {
        var hex = Y.one('.picker-input').get('value');
        if (objBucket.hasClass('page-background')) {
            PAGE_BG_COLOR = hex;
        } else if (objBucket.hasClass('bucket-highest')) {
            KEY_COLOR.block.highest.background = hex;
        }
        updateColors();

        Y.one('.picker-swatch').setStyles({'backgroundColor': hex});
        //Y.one('.picker-swatch .picker-input').set('value', hex);
    };
    Y.one('.picker-swatch .picker-input').on('blur', handlePickerTextInput);


    handlePicker = function(e) {
        var relX = (e.clientX - e.currentTarget.getX() + Y.one('document').get('scrollLeft')),
            relY = (e.clientY - e.currentTarget.getY() + Y.one('document').get('scrollTop'));

        pickerH = relX * 2; // hue sat image in picker is 180 px wide. 2 * 180 = range of 0 to 360 for hue
        pickerS = 100 -( relY / 180) * 100; // sat range is 0 to 100
        Y.one('#hs-dot').setStyles({'top': relY + 'px', 'left': relX + 'px'});

        pickerUpdateColors(objBucket);
    };
    handleLight = function(e) {
        pickerL = 100 - ((e.clientY - e.currentTarget.getY() + Y.one('document').get('scrollTop')) / 180) * 100; // lightness range is 0 to 100
        Y.one('#sliderL-line').setStyle('top', (e.clientY - e.currentTarget.getY() + Y.one('document').get('scrollTop')) + 'px');
        pickerUpdateColors(objBucket);
    };
    showPicker = function(e) {
        var bucketHex,
            hsl,
            a = Y.WidgetPositionAlign; // Local variable

        overlaySchemer.hide();
        Y.all('.bucket').addClass('bucket-deselected');
        e.target.removeClass('bucket-deselected');

        // For case of multiple buckets to click on
        // we need to update the color picker display
        // on picker show
        // also set the var objBucket, which is the DOM obj to receive the new color
        if (e.currentTarget.hasClass('bucket-page')) {
            objBucket = Y.one('.page-background');
            bucketHex = PAGE_BG_COLOR;
        } else if (e.currentTarget.hasClass('bucket-highest')){
            objBucket = e.currentTarget;
            bucketHex = KEY_COLOR.block.highest.background;
        }
        Y.one('.picker-swatch .picker-input').set('value', bucketHex);

        // set UI to match color of bucket value clicked on
        hsl = Y.Color.toArray(Y.Color.toHSL(bucketHex));
        overlayPicker.show();
        Y.one('#hs-dot').setStyles({'left': hsl[0] / 2, 'top': (180 - ((hsl[1] / 100) * 180))});

        Y.one('#sliderL-line').setStyle('top', 180 - ((hsl[2] / 100) * 180));
        Y.one('.picker-swatch').setStyle('backgroundColor', bucketHex);
        // set all of the values that are used in pickerUpdateColors()
        // so it will be ready to take a click, either h&s  or l
        pickerH = hsl[0];
        pickerS = hsl[1];
        pickerL = hsl[2];

        overlayPicker.set("align", {
            node: e.target,
            points: [a.TL, a.TR]
        });


    };
    handlePickerInputBlur = function(e) {
        var hex = Y.Escape.html(e.currentTarget.get('value')),
            hsl = hexToHsl(hex);

        pickerH = hsl[0];
        pickerS = hsl[1];
        pickerL = hsl[2];
//        pickerUpdateColors(objBucket);   this goes through hexToHsl and gets bug #2533176

        ////////  try to work around bug ticket #2533176 Y.Color

        /*    var hsl = Y.Color.fromArray([pickerH, pickerS, pickerL], Y.Color.TYPES.HSL),
            hex = Y.Color.toHex(hsl);
        */
            // depending on which bucket was clicked
            // change either the key color or the page background color
            if (objBucket.hasClass('page-background')) {
                PAGE_BG_COLOR = hex;
                SKIN.options.container = hex;
            } else if (objBucket.hasClass('bucket-highest')) {
                KEY_COLOR.block.highest.background = hex;
                SKIN.options.keycolor = hex;
            }

            // Using async to keep UI snappy.
            Y.config.win.setTimeout(updateColors, 20);

            Y.one('.picker-swatch').setStyles({'backgroundColor': hex});
            Y.one('.picker-swatch .picker-input').set('value', hex);



    };

    ////////////////////  scheme creator overlay  /////////////////////////////

    // set the scheme color swatch in the schemeOverlay
    // Update the scheme with the new scheme color adjustment object values
    handleSchemeValueChange = function() {
/*            adjustBlocks = [
                SKIN._space._adjust.high,
                SKIN._space._adjust.normal,
                SKIN._space._adjust.low,
                SKIN._space._adjustBG
//                SKIN._space._adjust.page

            ];
*/
        if (schemeOverlayIsReady) { // if this is NOT the initial control instance valueChanges, there should be a block index

            // update the color space based on the new block adjust values
            SKIN.initColorSpace();

            // doesn't work
            //SKIN.render(KEY_COLOR.block.highest.background);

            // doesn't seem to work.
            //SKIN.options.scheme = SCHEME_CUSTOM; // MATT REVIEW: the local my scheme object. instead of skin.initcolorspace().

            updateColors();

            // update the swatch bkg color
            Y.one('.schemer-swatch').setStyle('backgroundColor', schemeBlockDOM.getStyle('backgroundColor'));
        }
    };


    overlaySchemer = new Y.Overlay({
        srcNode:"#schemer-outer",
//         width: "600px",
//         height:"300px",
//           xy:
        zIndex       : 15

//        xy: [-800, 200]
    });
    overlaySchemer.render();
    overlaySchemer.hide();

    ddSchemer = new Y.DD.Drag({
        node: '#schemer-outer'
    }).plug(Y.Plugin.DDConstrained, {
        constrain: 'view'
    });


    // controls inside the scheme creator overlay //
    keyHue = 0,
        dialSchemeHue = new Y.Dial({
            min:-360,
            max:360,
            stepsPerRevolution:360,
            value: keyHue,
            strings:{label:'Hue:', resetStr: 'Reset', tooltipHandle: 'Drag to set'},
            after : {
                valueChange: function (e) {
                    blockAdjust.h = e.newVal;
                    setTimeout(handleSchemeValueChange, 100);
                }
            }
    });
    dialSchemeHue.render('#dial-scheme-hue');

    keySat = 23,
        sliderSchemeSat = new Y.Slider({
            thumbUrl: 'assets/images/blank_thumb.png',
            axis  : 'x',
            length: '100px',
            min   : -100,
            max   : 100,
            value : keySat,
            after : {
                valueChange: function (e) {
                    Y.one('.sat-output').setHTML(e.newVal);
                    blockAdjust.s = e.newVal;
                    setTimeout(handleSchemeValueChange, 100);
                }
            }
    });
    sliderSchemeSat.render('#slider-scheme-sat');
    Y.one('.sat-output').setHTML(keySat);

    keyLit = 13,
        sliderSchemeLit = new Y.Slider({
            thumbUrl: 'assets/images/blank_thumb.png',
            axis  : 'x',
            length: '100px',
            min   : -100,
            max   : 100,
            value : keyLit,
            after : {
                valueChange: function (e) {
                    Y.one('.lit-output').setHTML(e.newVal);
                    blockAdjust.l = e.newVal;
                    setTimeout(handleSchemeValueChange, 100);
                }
            }
    });

    sliderSchemeLit.render('#slider-scheme-lit');
    Y.one('.lit-output').setHTML(keyLit);

    showSchemer = function(e) {
        var relX = (e.clientX + Y.one('document').get('scrollLeft')),
            relY = (e.clientY + Y.one('document').get('scrollTop')),
            bucketHex,
            space = SKIN.colorspace,
            block = SKIN.colorspace.block;

            overlayPicker.hide();
            if (Y.one('.bucket-selected')) {
                Y.one('.bucket-selected').removeClass('bucket-selected');
            }
            e.target.addClass('bucket-selected');

        schemeBlockDOM = e.target.ancestor('.block'); // Used for getting color for swatch in overlay

        // For case of multiple buckets to click on
        // we need to update the color picker display on picker show
        // also set the var objBucket, which is the DOM obj to receive the new color
        if (e.currentTarget.hasClass('bucket-high')){
            blockAdjust = SCHEME_CUSTOM.high;
            bucketHex = block.high.background;
        }else if (e.currentTarget.hasClass('bucket-normal')){
            blockAdjust = SCHEME_CUSTOM.normal;
            bucketHex = block.normal.background;
        }else if (e.currentTarget.hasClass('bucket-low')){
            blockAdjust = SCHEME_CUSTOM.low;
            bucketHex = block.low.background;
        }else if (e.currentTarget.hasClass('bucket-lowest')){
            blockAdjust = SCHEME_CUSTOM.background;
            bucketHex = space.background;
             // special case for lowest because of nesting in a parent div with other blocks,
             // need to pick up the bkg color of the parent div
            schemeBlockDOM = Y.one('.color-space .background');
        }
        overlaySchemer.show();

        // set UI to match color of bucket value clicked on
        Y.one('.schemer-key').setStyle('backgroundColor', space.block.highest.background);
        Y.one('.schemer-swatch').setStyle('backgroundColor', bucketHex);

        // needed so that handleSchemeValueChange() won't adjust the colors until
        //all three, h, s, l, controls are initialized with the new values for the selected block.
        schemeOverlayIsReady = false;

        // set dial and sliders with current H, S, L of the main color that is the
        // parent of the color icon clicked on.

        dialSchemeHue.set('value', blockAdjust.h);
        sliderSchemeSat.set('value', blockAdjust.s);
        sliderSchemeLit.set('value', blockAdjust.l);
        schemeOverlayIsReady = true;
        overlaySchemer.move([(relX + 50), (relY - 10)]);

    };
    Y.one('#schemer-outer .close').on('click', function(){
        overlaySchemer.hide();
        // remove the selected class from scheme icons
        Y.all('.bucket-deselected').removeClass('bucket-deselected');
    });


    Y.all('.bucket-scheme').on('click', showSchemer);

    ////////////////////  END scheme creator overlay  /////////////////////////////

    ////////////////////  Begin Preview Palette Details (overlay) instance //////////////////////////
    overlayPalette = new Y.Overlay({
        srcNode:"#palette-outer",
        // width:"13em",
        // height:"10em",
        xy: [180, 86]
    });
    overlayPalette.render();
    overlayPalette.hide();

    ddPaletteOverlay = new Y.DD.Drag({
        node: '#palette-outer'
    }).plug(Y.Plugin.DDConstrained, {
        constrain: 'view'
    });

    // set the picker outer box ready for drag by grip
    paletteOuter = Y.one('#palette-outer');
    paletteOuter.plug(Y.Plugin.Drag);

    //Now you can only drag it from the .grip at the top of the blue box
    paletteOuter.dd.addHandle('#palette-outer .grip');

    Y.one('#palette-outer .close').on('click', function(){
        overlayPalette.hide();
        // remove the selected class from scheme icons
        Y.all('.bucket-deselected').removeClass('bucket-deselected');
    });
    Y.one('#preview-palette').on('click', function(){
        overlaySchemer.hide();
        overlayPicker.hide();
        overlayPalette.show();
    });

    ////////////////////  END Preview Palette Details (overlay) instance ////////////////////////////

    ////////////////////  Begin Help (overlay) instance //////////////////////////
    helpPanelOuter = Y.one('#help-panel');
    helpPanel = new Y.Overlay({
        srcNode:"#help-panel",
        width:"16em",
        // height:"10em",
        xy: [180, 86]
    });
    helpPanel.render();
    helpPanel.hide();

    ddHelpPanel = new Y.DD.Drag({
        node: '#help-panel'
    }).plug(Y.Plugin.DDConstrained, {
        constrain: 'view'
    });

    Y.one('#help-panel .close').on('click', function(){
        helpPanel.hide();
    });


    Y.all('.help').on('click', function(e) {
        var a = Y.WidgetPositionAlign,
            nameKey,
            currentHelpStr,
            position = [a.TR, a.TL];

        e.stopPropagation();
        if(e.target.hasClass('wpR')) { // wpR is a class given meaning "widget position right" of the "?"
            position = [a.TL, a.TR];
        }
        nameKey = e.target.get('className');
        nameKey = nameKey.substring(nameKey.indexOf('-') + 1);
        currentHelpStr = helpContent[nameKey];
        helpPanelOuter.one('.bd').setHTML(currentHelpStr);
        helpPanel.show();
        helpPanel.set("align",
        {
            node: e.target,
            points: position
        });

    });
    helpPanelOuter.on('clickoutside', function() {helpPanel.hide();});

    ////////////////////  END Help (overlay) instance ////////////////////////////

    Y.one('#hs').on('click', handlePicker);
    Y.one('#sliderL').on('click', handleLight);
    Y.one('.picker-input').on('blur', handlePickerInputBlur);
    Y.one('#picker-outer .close').on('click', function(){
        overlayPicker.hide();
        Y.all('.bucket-deselected').removeClass('bucket-deselected');
    });


    // sets the skin name and class prefix that will be replaced in all the
    // stylesheet templates
    updateBodySkinClass = function() {
        var body = Y.one('body');
        SKIN.options.prefix = Y.Escape.html(Y.one('.inp-skin-prefix').get('value'));
        SKIN.options.name = Y.Escape.html(Y.one('.inp-skin-name').get('value'));
        body.setAttribute('class', '');
        body.addClass(SKIN.options.prefix.substring(1) + SKIN.options.skinPrefix + SKIN.options.name);

        // Then we need to do refresh[component]Skin() function calls
        // Which are found in updateColors();
        // This will send the skin name into the Widget Maps -> Stylesheet Templates -> CSS
        updateColors();
    };
    Y.one('.inp-skin-name').on('keyup', function() {
        updateBodySkinClass();
    });
    Y.one('.inp-skin-prefix').on('keyup', function() {
        updateBodySkinClass();
    });

    Y.all('.bucket-picker').on('click', showPicker);
    Y.one('.page-background').setStyle('backgroundColor', PAGE_BG_COLOR);


    Y.one('.block.background').on('mouseenter', function(e){
        e.target.addClass('show-hover');
    });
    Y.one('.block.background').on('mouseout', function(e){
        e.target.removeClass('show-hover');
    });

    moveAbsolutePosPreviews = function(){
        overlay.move([anchorOverlay.getX(),  anchorOverlay.getY()] );
        panel.move([anchorPanel.getX(),  anchorPanel.getY()] );
    };
    setTimeout(moveAbsolutePosPreviews, 10);

    Y.on("windowresize", function(){
        moveAbsolutePosPreviews();
    });

    Y.one('.tab-schemes').on('click', function(){
        overlayPicker.hide();
        overlaySchemer.hide();
        updateSchemePreviews();
        Y.all('.bucket-deselected').removeClass('bucket-deselected');
    });
    Y.one('.tab-code').on('click', function(){
        overlayPicker.hide();
        overlaySchemer.hide();
        Y.one('#inp-url-link').setStyle('display', 'none');

    });

    // listen for checkboxes that turn on/off which modules to skin
    Y.one('#tab-modules').delegate('click', function(e){
        var modStr = e.target.get('id').substring(4),    // example id="mod-autocomplete"
            checkList = Y.all('#tab-modules input'),
            index = checkList.indexOf(e.target),
            displayMe;

        TEMPLATES_USED[index].display = e.target._node.checked;
        displayMe = (TEMPLATES_USED[index].display) ? 'inline-block' : 'none';

        Y.all('.sb-preview-' + modStr).setStyle('display', displayMe);

        // changes to what's previewed likely affects the postion of overlay and panel
        overlay.move([anchorOverlay.getX(),  anchorOverlay.getY()]);
        panel.move([anchorPanel.getX(),  anchorPanel.getY()]);

        updateCSS();

    }, 'input');


    //handle click of showHideAll checkboxes that manage which modules are skinned and displayed
    Y.one('#tab-modules').delegate('click', function(e){
        var showMe = (e.target.getHTML() === "Select All"),
            btnStr = showMe ? 'Remove All' : 'Select All',
            displayMe = showMe ? 'inline-block' : 'none',
            i;

        if(e.target.hasClass('btn-widget')){
            for(i = 0; i < TEMPLATES_USED.length; i+=1) {
                if(TEMPLATES_USED[i].type === 'widget') {
                    TEMPLATES_USED[i].display = showMe;
                    Y.all('.sb-preview-' + TEMPLATES_USED[i].name).setStyle('display', displayMe);
                }
            }
            Y.all('#checkboxes-widget input').set('checked', showMe);
            Y.one('#tab-modules .btn-widget').setHTML(btnStr);
         } else if (e.target.hasClass('btn-yuicss')) {
            for(i = 0; i < TEMPLATES_USED.length; i+=1) {
                if(TEMPLATES_USED[i].type === 'yuicss') {
                    TEMPLATES_USED[i].display = showMe;
                    Y.all('.sb-preview-' + TEMPLATES_USED[i].name).setStyle('display', displayMe);
                }
            }
            Y.all('#checkboxes-yuicss input').set('checked', showMe);
            Y.one('#tab-modules .btn-yuicss').setHTML(btnStr);
        }
        updateCSS();
    }, '.show-hide-all');


    // initial sync of preview (show/hide) and checkboxes ((un)checked) for each TEMPLATE_USE (checkboxes in "Modules" tab)
    // this also generates the name/checkbox pairs in the "Items" tab.
    // Names for checkboxes get pulled off the getContent() of the first instance of a .widget-preview-label of the templates_used
    // So to change the name of the checkbox in the "Items" tab, just change the contents-string of the first .widget-preview-label
    initPreviewAndModulesCheckboxes = function (){
        var widgetUl = Y.one('#checkboxes-widget'),
            yuiCSSUl = Y.one('#checkboxes-yuicss'),
            appendChksTo,
            displayName,
            i,
            chk;

        for(i = 0; i < TEMPLATES_USED.length; i+=1) {
            chk = (TEMPLATES_USED[i].display) ? 'checked' : '';

            displayName = Y.one('#widget-container .sb-preview-' + TEMPLATES_USED[i].name + ' .widget-preview-label').getContent();
            // if the name coming from the first instance of the module's markup contains a '-' such as 'Forms - Radios and Checkboxes'
            if (displayName.indexOf('-') > -1) {
                displayName = displayName.substring(0, displayName.indexOf('-'));
            }
            if(TEMPLATES_USED[i].type === "widget") {
                appendChksTo = widgetUl;
            } else if (TEMPLATES_USED[i].type === "yuicss") {
                appendChksTo = yuiCSSUl;
            }

            appendChksTo.append('<li><input id="mod-' + TEMPLATES_USED[i].name +
                '" type="checkbox" ' + chk + ' /> <label for ="mod-' +
                TEMPLATES_USED[i].name + '">' + displayName + '</label></li>');
        }
        // they have to inline-block in CSS initially or Dial won't render properly.
        // turn them all 'display' 'none' first
        Y.all('#widget-container>li').addClass('widget-container-hide-me');

        // show only the preview <li>'s of the modules to be used
        // set the checkboxes for the used modules to 'checked'
        for(i = 0; i < TEMPLATES_USED.length; i+=1) {
            if(TEMPLATES_USED[i].display){
                Y.all('#widget-container .sb-preview-' +
                    TEMPLATES_USED[i].name).replaceClass('widget-container-hide-me','widget-container-show-inline');
            }
        }
    };
    initPreviewAndModulesCheckboxes();



    ////////////////// functional & unit test //////////////////////

    // run tests only if the URL contains ?test
    runUnitTests = function() {
        if (document.URL.indexOf('?test') > -1 ) {

            var getCSSProperty = function(obj, cssProp) {
                var result = obj.getComputedStyle(cssProp);
                if( (cssProp.indexOf('padding') > -1) ||
                    (cssProp.toLowerCase().indexOf('radius') > -1)  ) {
                    result = Math.round(parseInt(result, 10));
                }
                return result;
            },

            getPropertyHex = function(obj, cssProp) {
                return Y.Color.toHex(obj.getComputedStyle(cssProp));
            },

            getGradient = function(obj) {
                var str = obj.getComputedStyle('backgroundImage');
                return str.substring(str.indexOf('rgba('), (str.indexOf('rgba(') + 20));
            },

            closeEnough = function(expected, actual) { // compensates for rounding that occurs in IE
                return (Math.abs(expected - actual) < 2);
            },



            suite = new Y.Test.Suite("Test Key and Page");


            suite.add(new Y.Test.Case({

                    name: "Test keycolor change",

                    //---------------------------------------------
                    // Special instructions
                    //---------------------------------------------

                    _should: {
                        ignore: {
                            test_radius: (Y.UA.ie > 0) && (Y.UA.ie < 9), //ignore this test where radius are not supported
                            test_gradient: (Y.UA.ie > 0) && (Y.UA.ie < 10)
                        }
                    },

                    //---------------------------------------------
                    // Setup and tear down
                    //---------------------------------------------

                    setUp : function () {
                        // set the key color
                        KEY_COLOR.block.highest.background = '#cc0000';

                        // fake an event for opening the color picker
                        var e = {
                            clientY: 100,
                            clientX: 100,
                            target: Y.one('.bucket-highest'),
                            currentTarget: Y.one('.bucket-highest')
                        };
                        showPicker(e);
                        Y.one('.picker-input').focus();
                        Y.one('.yui3-console-filter').focus(); //triggers the blur of the picker-input
                    },

                    tearDown : function () {
                    },

                    //---------------------------------------------
                    // Tests
                    //---------------------------------------------

                    testColors_from_KEY_COLOR_change: function () {


                        var test = this,
                            runLowTests = function() {
                            setTimeout(function() { //dely this assert for ie
                                test.resume(function() {
                                    Y.Assert.areEqual(KEY_COLOR.block.highest.background, SKIN.colorspace.block.highest.background,
                                        'KEY_COLOR.block.highest.background !== SKIN.colorspace.block.highest.background');
                                    Y.Assert.areEqual('#f7d4d4', getPropertyHex(Y.one('.block-low'), 'backgroundColor'),
                                        'wrong low.text.low hex');
                                    Y.Assert.areEqual('#e57171', getPropertyHex(Y.one('.block-low-text-low'), 'color'),
                                        'wrong low.text.low hex');
                                    Y.Assert.areEqual('#5a1111', getPropertyHex(Y.one('.block-low-text-normal'), 'color'),
                                        'wrong low.text.normal hex');
                                    Y.Assert.areEqual('#1a0505', getPropertyHex(Y.one('.block-low-text-high'), 'color'),
                                        'wrong low.text.high hex');

                                    Y.Assert.areEqual('#f2baba', getPropertyHex(Y.one('.block-low-rule-low'), 'borderTopColor'),
                                        'wrong low.rule.low hex');
                                    Y.Assert.areEqual('#fdf6f6', getPropertyHex(Y.one('.block-low-rule-high'), 'borderTopColor'),
                                        'wrong low.rule.high hex');

                                    Y.Assert.areEqual('#fdf6f6', getPropertyHex(Y.one('.block-low'), 'borderTopColor'),
                                        'wrong block.low borderTopColor hex');
                                    Y.Assert.areEqual('#f5c7c7', getPropertyHex(Y.one('.block-low'), 'borderBottomColor'),
                                        'wrong block.low borderBottomColor hex');
                                });
                            }, 1000);
                        };
                        runLowTests();
                        test.wait(3000);
                    },
                    test_radius: function () {
                        Y.Assert.areEqual('4', getCSSProperty(Y.one('.yui3-tab-label'), 'borderTopLeftRadius'), 'wrong border radius');
                    },
                    test_padding: function () {
                        Y.Assert.areEqual('6', getCSSProperty(Y.one('.yui3-tab-label'), 'paddingTop'), 'wrong padding top');
                        Y.Assert.areEqual('6', getCSSProperty(Y.one('.yui3-tab-label'), 'paddingBottom'), 'wrong padding bottom');
                        Y.Assert.areEqual('18', getCSSProperty(Y.one('.yui3-tab-label'), 'paddingLeft'), 'wrong padding left');
                        Y.Assert.areEqual('18', getCSSProperty(Y.one('.yui3-tab-label'), 'paddingRight'), 'wrong padding right');
                    },
                    test_gradient: function () {
                        Y.Assert.areEqual('rgba(254, 251, 251, ', getGradient(Y.one('.block-low .gradient')), 'wrong gradient');
                    }

            }));

            suite.add(new Y.Test.Case({

                    name: "Test page/container change",

                    //---------------------------------------------
                    // Setup and tear down
                    //---------------------------------------------

                    setUp : function () {
                        // set the page/container color
                        PAGE_BG_COLOR = "#aabbcc";

                        // fake an event for opening the color picker
                        var e = {
                            clientY: 100,
                            clientX: 100,
                            target: Y.one('.bucket-page'),
                            currentTarget: Y.one('.bucket-page')
                        };
                        showPicker(e);
                        Y.one('.picker-input').focus();
                        Y.one('.yui3-console-filter').focus(); //triggers the blur of the picker-input
                    },

                    tearDown : function () {
                    },

                    //---------------------------------------------
                    // Tests
                    //---------------------------------------------


                    test_colors_from_page_color_change: function () {
                        var test = this,
                            runBkgColorTests = function() {
                            setTimeout(function() { //dely this assert for ie
                                test.resume(function() {
                                    Y.Assert.areEqual(PAGE_BG_COLOR, SKIN.colorspace.block.container.background,
                                        'fails: PAGE_BG_COLOR !== ...container.background');
                                    Y.Assert.areEqual('#aabbcc', SKIN.colorspace.block.container.background,
                                        'wrong .page.background from block hex. see ticket #2533176 Y.Color');
                                    Y.Assert.areEqual('#aabbcc', getPropertyHex(Y.one('.block-page'), 'backgroundColor'),
                                        'wrong .page.background from obj hex. see ticket #2533176 Y.Color');
                                    Y.Assert.areEqual('#fcfcfd', getPropertyHex(Y.one('.block-page-text-low'), 'color'),
                                        'wrong .page.text.low hex');
                                    Y.Assert.areEqual('#06080a', getPropertyHex(Y.one('.block-page-text-normal'), 'color'),
                                        'wrong .page.text.normal hex');
                                    Y.Assert.areEqual('#020303', getPropertyHex(Y.one('.block-page-text-high'), 'color'),
                                        'wrong .page.text.high hex');

                                    Y.Assert.areEqual('#869eb6', getPropertyHex(Y.one('.block-page-rule-low'), 'borderTopColor'),
                                        'wrong .page.rule.low hex');
                                    Y.Assert.areEqual('#c2cfdb', getPropertyHex(Y.one('.block-page-rule-high'), 'borderTopColor'),
                                        'wrong .page.rule.high hex');

                                    Y.Assert.areEqual('#c2cfdb', getPropertyHex(Y.one('.block-page'), 'borderTopColor'),
                                        'wrong page borderTopColor hex');
                                    Y.Assert.areEqual('#99adc2', getPropertyHex(Y.one('.block-page'), 'borderBottomColor'),
                                        'wrong page borderBottomColor hex');
                                });
                            }, 2300);
                        };
                        runBkgColorTests();
                        test.wait(3000);
                    }
            }));
            suite.add(new Y.Test.Case({

                    name: "Test changing slider values",

                    //---------------------------------------------
                    // Special instructions
                    //---------------------------------------------

                    _should: {
                        ignore: {
                            test_changing_radius_slider: (Y.UA.ie > 0) && (Y.UA.ie < 9) //ignore this test where radius are not supported
                        }
                    },

                    //---------------------------------------------
                    // Setup and tear down
                    //---------------------------------------------

                    setUp : function () {
                            sliderPaddingVert.set('value', 150);
                            sliderPaddingHoriz.set('value', 150);
                            sliderTextContrast.set('value', 20);
                            sliderRadius.set('value', 130);
                    },

                    tearDown : function () {
                    },

                    //---------------------------------------------
                    // Tests
                    //---------------------------------------------


                    test_changing_slider_values: function () {
                        var test = this,
                            runSliderValueTests = function() {
                            setTimeout(function() { //dely this assert for ie
                                test.resume(function() {
                                    Y.Assert.isTrue(closeEnough(14, parseInt(Y.one('.yui3-datatable-cell').getStyle('paddingTop'), 10)),
                                        'padding top on datatable is wrong');
                                    Y.Assert.areEqual(150, sliderPaddingVert.get('value'), 'vert. padding slider is wrong');
                                    Y.Assert.areEqual('rgb(13, 2, 2)', Y.one('.yui3-tabview-panel').getComputedStyle('color'),
                                        'wrong text color in tab panel');
                                });
                            }, 1000);
                        };
                        runSliderValueTests();
                        test.wait(3000);
                    },

                    test_changing_radius_slider: function () {
                        var test = this,
                            runSliderValueTests = function() {
                            setTimeout(function() { //dely this assert for ie
                                test.resume(function() {
                                    Y.Assert.areEqual('16px', Y.one('.yui3-tab-label').getStyle('borderTopRightRadius'),
                                        'tab label border-radius not correct');
                                });
                            }, 1000);
                        };
                        runSliderValueTests();
                        test.wait(3000);
                    }
            }));

            suite.add(new Y.Test.Case({

                    name: "Test Custom Scheme Change",

                    //---------------------------------------------
                    // Setup and tear down
                    //---------------------------------------------

                    setUp : function () {
                        var schemeIconClickEvent = {
                                clientX: 200,
                                clientY: 100,
                                target: Y.one('.bucket-normal'),
                                currentTarget: Y.one('.bucket-normal')

                            },
                            radioClickEvent = {
                                target: Y.one('.scheme-radios #custom')
                            };

                        handleSchemeRadioClick(radioClickEvent);
                        showSchemer(schemeIconClickEvent);
                        dialSchemeHue.set('value', 180);
                        sliderSchemeSat.set('value', 50);
                        sliderSchemeLit.set('value', -40);
                        setTimeout(updateColors, 100);
                    },

                    tearDown : function () {
                    },

                    //---------------------------------------------
                    // Tests
                    //---------------------------------------------

                    test_change_scheme_values: function () {
                        var test = this,
                            runBkgColorTests = function() {
                            setTimeout(function() { //dely this assert for ie
                                test.resume(function() {
                                    Y.Assert.areEqual('#008000', getPropertyHex(Y.one('.block-normal'), 'backgroundColor'),
                                        'wrong .block.normal hex');
                                });
                            }, 1000);
                        };
                        runBkgColorTests();
                        test.wait(3000);
                    }
            }));

            suite.add(new Y.Test.Case({

                    name: "Test QueryString",

                    //---------------------------------------------
                    // Setup and tear down
                    //---------------------------------------------

                    setUp : function () {
                    },

                    tearDown : function () {
                    },

                    //---------------------------------------------
                    // Tests
                    //---------------------------------------------


                    test_getting_querystring: function () {
                        var runQueryValueTests = function() {
                            var query;
                            handleCreateQueryString();
                            query = Y.one('#inp-url-link').get('value');
                            query = query.substring(query.indexOf('?'));

                            Y.Assert.areEqual('?opt=mine,cc0000,aabbcc,3,3,40,2&h=0,-30,60&n=180,50,-40&l=0,-30,80&b=0,-30,90', query,
                                'querystring is wrong');
                        };
                        runQueryValueTests();
                    }
            }));


            //tests go here

            //initialize the console
            (new Y.Test.Console({
                newestOnTop: false
            })).render('#log');




            //add the test cases and suites
            Y.Test.Runner.add(suite);
            //Y.Test.Runner.add(oTestSuite);

            //run all tests
            Y.Test.Runner.run();
        } // end of if the query string has "?test"
    };

    runUnitTests();

    Y.one('.yui3-loading').removeClass('yui3-loading'); // let body be visible

////////////////// query string skin def ////////////////////////

        ////////// read a query string and set all things ///////////
        // using Y.QueryString
    setSkinFromQuery = function () {
        var i,
            tUsed = TEMPLATES_USED;
        if (document.URL.indexOf('mode=kimono') > -1 ) {
            isKimono = true;
            // change prefix for classnames in CSS templates
            //SKIN.options.prefix = '.k-';

            // change the contents of the Items tab to only show Kimono
            // and a means to switch to YUI mode, (reload page link/href)
            Y.one('#tab-modules').addClass('items-kimono');
            Y.one('#tab-code .inp-skin-prefix').set('value', SKIN.defaultYuiCssPrefix);
            // change the values in TEMPLATES_USED array
            // to exclude YUI widgets and include Kimono modules
            for (i = 0; i < tUsed.length; i+=1 ) {
                if( tUsed[i].type === 'widget') { // is a YUI widget
                    tUsed[i].display = false;
                } else if (tUsed[i].type === 'yuicss') {
                    tUsed[i].display = true;
                }
            }

            // In Skin Preview, only show kimono modules
            initPreviewAndModulesCheckboxes();
            updateColors();
        }


        if (document.URL.indexOf('?opt=') > -1 ) {
            var theURL = document.URL,
                theQuery = theURL.substring(theURL.indexOf('.html?') + 6),
                qData,
                dataIsValid = true,
                validationMsg,
                myProp,
                myValid,
                i;

            qData = Y.QueryString.parse(theQuery);

            for (myProp in qData) {


                if (qData.hasOwnProperty(myProp)) {
                    qData[myProp] = qData[myProp].split(',');
                }
            }

            // data validation for query string contents
            if(Y.Lang.isString(qData.opt[0]) === "false") {
                validationMsg = " the skin name is not a string.";
                dataIsValid = false;
            }else if(qData.opt[1].length !== 6) {
                validationMsg = " the Master color is not formatted as a hex value.";
                dataIsValid = false;
            }else if(qData.opt[2].length !== 6) {



                validationMsg = " the background color is not formatted as a hex value.";
                dataIsValid = false;
            }else{

                for (i = 3; i < qData.opt.length; i+=1){
                    qData.opt[i] = Y.Number.parse(qData.opt[i]);
                    if(Y.Lang.isNumber(qData.opt[i]) === false){
                        validationMsg = " one of the slider values is not a number.";
                        dataIsValid = false;
                        break;
                    }
                }

                myValid = function(k){
                    if(dataIsValid){
                        for (i = 0; i < qData[k].length; i+=1){
                            qData[k][i] = Y.Number.parse(qData[k][i]);
                            if(Y.Lang.isNumber(qData[k][i]) === false){
                                validationMsg = " a hue, sat, or lit value is not a number.";
                                dataIsValid = false;
                                break;
                            }
                            if(i === 0) {
                                if(qData[k][i] < -360){
                                    validationMsg = " a hue value is < -360.";
                                    dataIsValid = false;
                                    break;
                                }
                                if(qData[k][i] > 360){
                                    validationMsg = " a hue value is > 360.";
                                    dataIsValid = false;
                                    break;
                                }

                            } else {
                                if(qData[k][i] < -100){
                                    validationMsg = " a sat, or lit value is < -100.";
                                    dataIsValid = false;
                                    break;
                                }
                                if(qData[k][i] > 100){
                                    validationMsg = " a sat, or lit value is > 100.";
                                    dataIsValid = false;
                                    break;
                                }
                            }
                        }
                    }
                };
                myValid('h');
                myValid('n');
                myValid('l');
                myValid('b');
            }
            if(dataIsValid === false) {
                alert("There is a problem with the querystring in the URL: " + validationMsg + "\n We'll just use the default skin.");
            }

            // assign values to constants and options
            if(dataIsValid) {
                SCHEME_CUSTOM.high = {h:qData.h[0], s:qData.h[1], l:qData.h[2]}; //querySkin.high;
                SCHEME_CUSTOM.normal = {h:qData.n[0], s:qData.n[1], l:qData.n[2]}; //querySkin.normal;
                SCHEME_CUSTOM.low = {h:qData.l[0], s:qData.l[1], l:qData.l[2]}; //querySkin.low;
                SCHEME_CUSTOM.background = {h:qData.b[0], s:qData.b[1], l:qData.b[2]}; //querySkin.background;

                SKIN.options.name = qData.opt[0]; //querySkin.meta[0]; //name;
                KEY_COLOR.block.highest.background = '#' + qData.opt[1]; //querySkin.meta[1]; //.master;
                SKIN.options.keycolor = '#' + qData.opt[1]; //querySkin.meta[1]; //.master;
                KEY_COLOR.background = '#' + qData.opt[2]; //querySkin.meta[2]; //.page;
                PAGE_BG_COLOR = '#' + qData.opt[2]; //querySkin.meta[2]; //.page;

                // Set value on sliders directly, then they update the options such as
                // SKIN.options.paddingHoriz by the sliders valueChange function
                sliderPaddingHoriz.set('value', qData.opt[3] * 50);
                sliderPaddingVert.set('value', qData.opt[4] * 50);
                sliderRadius.set('value', qData.opt[5]);
                sliderTextContrast.set('value', qData.opt[6] * 10);

                Y.one('.inp-skin-name').set('value', qData.opt[0]);
                SCHEME_NAME = 'custom';
                Y.all('.scheme-radios input').set('checked', '');
                Y.one('.scheme-radios #custom').set('checked', "checked");
                updateBodySkinClass();
            }
        }
    };
    setSkinFromQuery();

    handleCreateQueryString = function() {
        // create URL with querystring for skin definition
        var strUnesc,
            theBaseURL,
            linkInput = Y.one('#inp-url-link'),
            sData = {
                opt:[
                    SKIN.options.name,
                    SKIN.options.keycolor.substring(1),
                    SKIN.options.container.substring(1),
                    SKIN.options.paddingHoriz,
                    SKIN.options.paddingVert,
                    SKIN.options.radius,
                    SKIN._space.options.textContrast
                ].toString(),
                h:[SCHEME_CUSTOM.high.h, SCHEME_CUSTOM.high.s, SCHEME_CUSTOM.high.l].toString(),
                n:[SCHEME_CUSTOM.normal.h, SCHEME_CUSTOM.normal.s, SCHEME_CUSTOM.normal.l].toString(),
                l:[SCHEME_CUSTOM.low.h, SCHEME_CUSTOM.low.s, SCHEME_CUSTOM.low.l].toString(),
                b:[SCHEME_CUSTOM.background.h, SCHEME_CUSTOM.background.s, SCHEME_CUSTOM.background.l].toString()
            };
        if (document.URL.indexOf('.html') === -1){
            theBaseURL = document.URL + 'index.html';
        } else {
            theBaseURL = document.URL.substring(0, (document.URL.indexOf('.html') + 5));
        }
        strUnesc = Y.QueryString.unescape(Y.QueryString.stringify(sData));

        linkInput.setStyle('display', 'block');
        linkInput.set('value', theBaseURL + '?' + strUnesc);
        linkInput.focus();
        linkInput.select();


    };



    // listener for get URL button /////////////
    Y.one('#btn-get-url').on('click', handleCreateQueryString);
////////////////  end query string stuff //////////////


});
