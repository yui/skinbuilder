
var overlaySkin,
    refreshOverlaySkin = function() {

    overlaySkin = {
        skinName: space.skin.name,
        prefix:   space.skin.prefix,

        hdBdFtPadding: getPadding(0.3, 0.5), // /*0.3em 0.5em;*/

        background:         space.background,
        border:             space.border.low,
        text:               space.text.normal,

        foo: space


    };

};