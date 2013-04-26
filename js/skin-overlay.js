YUI.add('skin-overlay', function (Y) {

Y.Skin.renderers.overlay = function (skin) {
    var space = skin.colorspace;

    return {
        hdBdFtPadding: skin.padding(0.3, 0.5), // /*0.3em 0.5em;*/

        background:         space.background,
        border:             space.border.low,
        text:               space.text.normal,

        foo: space
    };
};

}, '0.0.1', {
    requires: []
});
