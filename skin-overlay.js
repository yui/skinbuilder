YUI.add('skin-overlay', function (Y) {

var Skin  = Y.Skin,
    space = Skin.SPACE;

Skin.overlay = null;
Skin.refreshOverlaySkin = function () {
    Skin.overlay = {
        skinName: space.skin.name,
        prefix:   space.skin.prefix,

        hdBdFtPadding: Skin.getPadding(0.3, 0.5), // /*0.3em 0.5em;*/

        background:         space.background,
        border:             space.border.low,
        text:               space.text.normal,

        foo: space
    };
};

}, '0.0.1', {
    requires: ['skin-space']
});
