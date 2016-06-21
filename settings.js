/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function hex2rgb(hexStr) {
    // note: hexStr should be #rrggbb
    var hex = parseInt(hexStr.substring(1), 16);
    var r = (hex & 0xff0000) >> 16;
    var g = (hex & 0x00ff00) >> 8;
    var b = hex & 0x0000ff;
    return [r, g, b];
}

function rgb2hex(rgb) {
    console.log(rgb);
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    //var res = "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    //console.log(res);
    //return res;
}
//0123456789
function Settings() {
    //constructor(){
    console.log("Settings::constructor");

    this.sts = [];
    this.sts["PageSizeX"] = 20;
    this.sts["PageMaxSizeX"] = 500;
    this.sts["PageSizeY"] = 10;
    this.sts["LineSpace"] = 0;
    this.sts["LetterSpace"] = 0;
    this.sts["LetterWidth"] = 10;
    this.sts["LetterHeight"] = 15;

    //this.colors2 = ["#828b20", "#b0ac31", "#cbc53d", "#fad779", "#f9e4ad", "#faf2db", "#563512", "#9b4a0b", "#d36600", "#fe8a00", "#f9a71f"];
    this.canvasColor = "#ffffff";

    this.colors = [];
    this.randomizeColors();

    this.gradientFromColor = "#000000";
    this.gradientToColor = "#ffffff";

    //this.colors[65] = "#000000";
    //this.colors[66] = "#ffffff";
    //this.colors[67] = "#00ff00";

    //var KEYCODE_ENTER = 13;		//useful keycode
    //var KEYCODE_SPACE = 32;		//useful keycode
    //this.colors[13] = '';
    this.colors['\n'] = '#ffffff';
    this.colors[' '] = this.canvasColor; //'#ff0000';
    this.colors['A'] = '#ff0000';
    this.colors['B'] = '#00ff00';
    this.colors['C'] = '#0000ff';
}

Settings.prototype.spinnerChange = function (wv, nv) {
    this.sts[wv] = nv;
    refreshAll();
};

Settings.prototype.spinnerChange2 = function (wv, nv) {
    this.sts[wv] = nv;
    //refreshAll();
    refreshCanvasSize();
};

Settings.prototype.canvasColorChange = function (newColor) {
    //console.log('ccc');
    this.canvasColor = "#" + newColor;
    this.colors[13] = this.canvasColor;
    $("#gameCanvas").css("background-color", this.canvasColor);
    $("#clrsmpCanvas").css("background-color", this.canvasColor);
    //refreshAll();
};

Settings.prototype.spaceColorChange = function (newColor) {
    this.colors[32] = "#" + newColor;
    $("#clrsmpSpace").css("background-color", this.colors[32]);
    refreshAll();
};

Settings.prototype.gradientFromColorChange = function (newColor) {
    this.gradientFromColor = "#" + newColor;
    $("#clrsmpGradientFrom").css("background-color", settings.gradientFromColor);
};
Settings.prototype.gradientToColorChange = function (newColor) {
    this.gradientToColor = "#" + newColor;
    $("#clrsmpGradientTo").css("background-color", settings.gradientToColor);
};

Settings.prototype.letterColorChange = function (wc, newColor) {
    //console.log("lcc:"+$(wc).attr("id")+" " +newColor);

    var aid = $(wc).attr("id");
    var naid = aid.substr(11);
    //console.log(naid);
    this.colors[naid] = "#" + newColor;
    $("#clrsmp" + naid).css("background-color", this.colors[naid]);
    refreshAll();
};

Settings.prototype.randomizeColors = function () {
    for (var i = 65; i <= 90; ++i)
    {
        //this.colors[i] = '#' + Math.floor(Math.random() * 16777215).toString(16); //this.colors2[Math.random() * this.colors2.length | 0];
    }
};

Settings.prototype.fillColorsWithGradient = function () {
    var from = hex2rgb(this.gradientFromColor);
    //console.log(from);
    var to = hex2rgb(this.gradientToColor);
    //console.log(to);

    var numColors = 90 - 65;

    var rFrom = from[0];
    var gFrom = from[1];
    var bFrom = from[2];

    var rdiff = to[0] - from[0];
//        if( to[0] > from[0] ) rdiff = to[0] - from[0];
//        else{ 
//            rdiff = from[0] - to[0];
//            rFrom = to[0];
//        }

    var gdiff = to[1] - from[1];
//        if( to[1] > from[1] ) gdiff = to[1] - from[1];
//        else { 
//            gdiff = from[1] - to[1];
//            gFrom = to[1];
//        }

    var bdiff = to[2] - from[2];
//        if( to[2] > from[2] ) bdiff = to[2] - from[2];
//        else {
//            bdiff = from[2] - to[2];
//            bFrom = to[2];
//        }

    var rStep = rdiff / numColors;
    var gStep = gdiff / numColors;
    var bStep = bdiff / numColors;

    var cntr = 0;
    for (var i = 65; i <= 90; ++i)
    {
        var rgbStr = "rgb(" + Math.round(rFrom + cntr * rStep) + "," + Math.round(gFrom + cntr * gStep) + "," + Math.round(bFrom + cntr * bStep) + ")";
        //console.log( rgb2hex(rgbStr) );
        this.colors[i] = rgb2hex(rgbStr);
        //this.colors[i] = '#'+Math.floor(Math.random()*16777215).toString(16);
        cntr++;
    }
}

var settings = new Settings();

function fff(setID, val) {
    //console.log(spinner);
    settings.spinnerChange(setID, val);
}

function fff2(setID, val) {
    //console.log(spinner);
    settings.spinnerChange2(setID, val);
}

function initSettings() {

    console.log("initSettings()");

    var spinner;

//    spinner = $( "#spinnerPageSizeX" ).spinner();
//    spinner.spinner( "option", "min", 10 );
//    spinner.spinner( "option", "max", 50 );
//    spinner.spinner( "value", settings.sts["PageSizeX"] );
//    spinner.on( "spinchange", function( event, ui ) { fff("PageSizeX",ui.value); } );
//    spinner.on( "spin", function( event, ui ) { fff("PageSizeX",ui.value); } );

    spinner = $("#spinnerMaxPageSizeX").spinner();
    spinner.spinner("option", "min", 300);
    spinner.spinner("option", "max", 650);
    spinner.spinner("value", settings.sts["PageMaxSizeX"]);
    spinner.on("spinchange", function (event, ui) {
        fff2("PageMaxSizeX", ui.value);
    });
    spinner.on("spin", function (event, ui) {
        fff2("PageMaxSizeX", ui.value);
    });

    spinner = $("#spinnerPageSizeY").spinner();
    spinner.spinner("option", "min", 10);
    spinner.spinner("option", "max", 70);
    spinner.spinner("value", settings.sts["PageSizeY"]);
    spinner.on("spinchange", function (event, ui) {
        fff2("PageSizeY", ui.value);
    });
    spinner.on("spin", function (event, ui) {
        fff2("PageSizeY", ui.value);
    });

    spinner = $("#spinnerLineSpace").spinner();
    spinner.spinner("option", "min", 0);
    spinner.spinner("option", "max", 50);
    spinner.spinner("value", settings.sts["LineSpace"]);
    spinner.on("spinchange", function (event, ui) {
        fff("LineSpace", ui.value);
    });
    spinner.on("spin", function (event, ui) {
        fff("LineSpace", ui.value);
    });

    spinner = $("#spinnerLetterSpace").spinner();
    spinner.spinner("option", "min", 0);
    spinner.spinner("option", "max", 20);
    spinner.spinner("value", settings.sts["LetterSpace"]);
    spinner.on("spinchange", function (event, ui) {
        fff("LetterSpace", ui.value);
    });
    spinner.on("spin", function (event, ui) {
        fff("LetterSpace", ui.value);
    });

    spinner = $("#spinnerLetterWidth").spinner();
    spinner.spinner("option", "min", 10);
    spinner.spinner("option", "max", 50);
    spinner.spinner("value", settings.sts["LetterWidth"]);
    spinner.on("spinchange", function (event, ui) {
        fff("LetterWidth", ui.value);
    });
    spinner.on("spin", function (event, ui) {
        fff("LetterWidth", ui.value);
    });

    spinner = $("#spinnerLetterHeight").spinner();
    spinner.spinner("option", "min", 10);
    spinner.spinner("option", "max", 50);
    spinner.spinner("value", settings.sts["LetterHeight"]);
    spinner.on("spinchange", function (event, ui) {
        fff("LetterHeight", ui.value);
    });
    spinner.on("spin", function (event, ui) {
        fff("LetterHeight", ui.value);
    });

    // canvas color
    $("#gameCanvas").css("background-color", settings.canvasColor);
    $("#colorpickerCanvas").val(settings.canvasColor);
    $("#clrsmpCanvas").css("background-color", settings.canvasColor);

    $('#colorpickerCanvas').ColorPicker({
        onSubmit: function (hsb, hex, rgb, el) {
            settings.canvasColorChange(hex);
            $(el).val("#" + hex);
            $(el).ColorPickerHide();
        },
        onBeforeShow: function () {
            $(this).ColorPickerSetColor(this.value);
        }
    })

    // space color
    $("#colorpickerSpace").val(settings.colors[32]);
    $("#clrsmpSpace").css("background-color", settings.colors[32]);

    $('#colorpickerSpace').ColorPicker({
        onSubmit: function (hsb, hex, rgb, el) {
            settings.spaceColorChange(hex);
            $(el).val("#" + hex);
            $(el).ColorPickerHide();
        },
        onBeforeShow: function () {
            $(this).ColorPickerSetColor(this.value);
        }
    })


    // gradient

    $("#colorpickerGradientFrom").val(settings.gradientFromColor);
    $("#clrsmpGradientFrom").css("background-color", settings.gradientFromColor);
    $("#colorpickerGradientTo").val(settings.gradientToColor);
    $("#clrsmpGradientTo").css("background-color", settings.gradientToColor);

    $('#colorpickerGradientFrom').ColorPicker({
        onSubmit: function (hsb, hex, rgb, el) {
            settings.gradientFromColorChange(hex);
            $(el).val("#" + hex);
            $(el).ColorPickerHide();
        },
        onBeforeShow: function () {
            $(this).ColorPickerSetColor(this.value);
        }
    })
    $('#colorpickerGradientTo').ColorPicker({
        onSubmit: function (hsb, hex, rgb, el) {
            settings.gradientToColorChange(hex);
            $(el).val("#" + hex);
            $(el).ColorPickerHide();
        },
        onBeforeShow: function () {
            $(this).ColorPickerSetColor(this.value);
        }
    })

    for (var l = 65; l <= 90; l++)
    {
        $("#colorpicker" + l).val(settings.colors[l]);
        $("#clrsmp" + l).css("background-color", settings.colors[l]);
        //console.log($("#colorpicker"+l));

        $("#colorpicker" + l).ColorPicker({
            onSubmit: function (hsb, hex, rgb, el) {
                settings.letterColorChange(el, hex);
                $(el).val("#" + hex);
                $(el).ColorPickerHide();
            },
            onBeforeShow: function () {
                $(this).ColorPickerSetColor(this.value);
            },
//        onChange: function(hsb, hex, rgb, el) {
//            //settings.letterColorChange(el,hex);
//            //$(el).val("#"+hex);
//            console.log(hex);
//        }
        })
    }
}

function fillClrSmps() {
    for (var l = 65; l <= 90; l++) {
        $("#colorpicker" + l).val(settings.colors[l]);
        $("#clrsmp" + l).css("background-color", settings.colors[l]);
    }
}