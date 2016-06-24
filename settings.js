/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

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
    
    this.gradientFromColor = "#000000";
    this.gradientToColor = "#ffffff";

    //this.colors[65] = "#000000";
    //this.colors[66] = "#ffffff";
    //this.colors[67] = "#00ff00";

    //var KEYCODE_ENTER = 13;		//useful keycode
    //var KEYCODE_SPACE = 32;		//useful keycode
    //this.colors[13] = '';
    
    this.spaceCode = ' '.charCodeAt(0);
    this.newLineCode = '\n'.charCodeAt(0);
    
    this.colors[this.newLineCode] = this.canvasColor;;
    this.colors[this.spaceCode] = this.canvasColor; //'#ff0000';
    
    //this.colors['A'] = '#ff0000';
    //this.colors['B'] = '#00ff00';
    //this.colors['C'] = '#0000ff';

    //"ABC".charCodeAt(0) // returns 65
    //String.fromCharCode(65, 66, 67); // returns 'ABC'

    for (var i = 'A'.charCodeAt(0) ; i <= 'Z'.charCodeAt(0) ; ++i) {
        //console.log(i);
        this.colors[i] = '#ff0000';
    }
    for (var i = 'a'.charCodeAt(0) ; i <= 'z'.charCodeAt(0) ; ++i) {
        //console.log(i);
        //this.colors[String.fromCharCode(i)] = '#ff0000';
    }
    for (var i = '0'.charCodeAt(0) ; i <= '1'.charCodeAt(0) ; ++i) {
        //console.log(String.fromCharCode(i));
        this.colors[i] = '#ff0000';
    }

    var s = "±æê³ó¶ñ¿¼¡ÆÊ£Ó¦Ñ¯¬";
    for (var i = 0 ; i < s.length ; ++i)
    {
        //console.log(String.fromCharCode(s.charCodeAt(i)));
        //this.colors[String.fromCharCode(s.charCodeAt(i))] = '#ff0000';
    }
    
    //console.log(this.colors);
    //console.log(this.colors[2]);
    
    this.randomizeColors();
}

function encode_utf8(s) {
    return unescape(encodeURIComponent(s));
}

function decode_utf8(s) {
    return decodeURIComponent(escape(s));
}

Settings.prototype.spinnerChange2 = function (wv, nv) {
    this.sts[wv] = nv;
    refreshCanvasSize();
};

Settings.prototype.canvasColorChange = function (newColor) {
    this.canvasColor = "#" + newColor;
    this.colors[13] = this.canvasColor;
    $("#gameCanvas").css("background-color", this.canvasColor);
    $("#clrsmpCanvas").css("background-color", this.canvasColor);
    cttaTextChanged2();
};

Settings.prototype.spaceColorChange = function (newColor) {
    this.colors[32] = "#" + newColor;
    $("#clrsmpSpace").css("background-color", this.colors[32]);
    cttaTextChanged2();
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
    var aid = $(wc).attr("id");
    var naid = aid.substr(11);
    this.colors[naid] = "#" + newColor;
    $("#clrsmp" + naid).css("background-color", this.colors[naid]);
    cttaTextChanged2();
};

Settings.prototype.randomizeColors = function () {
    for (var i in this.colors) {        
        //console.log(i + " " + this.colors[i] + " " + this.newLineCode + " " + this.spaceCode);
        if (i == this.newLineCode || i == this.spaceCode) {
            //console.log("contine");
            continue;
        }
        this.colors[i] = '#' + Math.floor(Math.random() * 16777215).toString(16); //this.colors2[Math.random() * this.colors2.length | 0];
    }
};

Settings.prototype.fillColorsWithGradient = function () {
    var from = hex2rgb(this.gradientFromColor);
    var to = hex2rgb(this.gradientToColor);
    
    var numColors = 90 - 65;

    var rFrom = from[0];
    var gFrom = from[1];
    var bFrom = from[2];

    var rdiff = to[0] - from[0];
    var gdiff = to[1] - from[1];
    var bdiff = to[2] - from[2];

    var rStep = rdiff / numColors;
    var gStep = gdiff / numColors;
    var bStep = bdiff / numColors;

    var cntr = 0;
    for (var i = 65; i <= 90; ++i)
    {
        var rgbStr = "rgb(" + Math.round(rFrom + cntr * rStep) + "," + Math.round(gFrom + cntr * gStep) + "," + Math.round(bFrom + cntr * bStep) + ")";
        this.colors[i] = rgb2hex(rgbStr);
        cntr++;
    }
};

var settings = new Settings();

function fff2(setID, val) {
    settings.spinnerChange2(setID, val);
}

function initSettings() {
    var spinner;
    
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
        fff2("LineSpace", ui.value);
    });
    spinner.on("spin", function (event, ui) {
        fff2("LineSpace", ui.value);
    });

    spinner = $("#spinnerLetterSpace").spinner();
    spinner.spinner("option", "min", 0);
    spinner.spinner("option", "max", 20);
    spinner.spinner("value", settings.sts["LetterSpace"]);
    spinner.on("spinchange", function (event, ui) {
        fff2("LetterSpace", ui.value);
    });
    spinner.on("spin", function (event, ui) {
        fff2("LetterSpace", ui.value);
    });

    spinner = $("#spinnerLetterWidth").spinner();
    spinner.spinner("option", "min", 10);
    spinner.spinner("option", "max", 50);
    spinner.spinner("value", settings.sts["LetterWidth"]);
    spinner.on("spinchange", function (event, ui) {
        fff2("LetterWidth", ui.value);
    });
    spinner.on("spin", function (event, ui) {
        fff2("LetterWidth", ui.value);
    });

    spinner = $("#spinnerLetterHeight").spinner();
    spinner.spinner("option", "min", 10);
    spinner.spinner("option", "max", 50);
    spinner.spinner("value", settings.sts["LetterHeight"]);
    spinner.on("spinchange", function (event, ui) {
        fff2("LetterHeight", ui.value);
    });
    spinner.on("spin", function (event, ui) {
        fff2("LetterHeight", ui.value);
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
    });

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
    });

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
    });
    $('#colorpickerGradientTo').ColorPicker({
        onSubmit: function (hsb, hex, rgb, el) {
            settings.gradientToColorChange(hex);
            $(el).val("#" + hex);
            $(el).ColorPickerHide();
        },
        onBeforeShow: function () {
            $(this).ColorPickerSetColor(this.value);
        }
    });

    //for (var l = 65; l <= 90; l++)
    //{
    
    //console.log(settings.colors);
    
    for (var col in settings.colors) {
         if (col === settings.newLineCode || col === settings.spaceCode) continue;
         
        //var clrPicker = $("#colorpicker" + l.charCodeAt(0));        
        //console.log(clrPicker);
        //console.log(l.charCodeAt(0));
        
        $("#colorpicker" + col).val(settings.colors[col]);        
        $("#clrsmp" + col).css("background-color", settings.colors[col]);
        
        $("#colorpicker" + col).ColorPicker({
            onSubmit: function (hsb, hex, rgb, el) {
                settings.letterColorChange(el, hex);
                $(el).val("#" + hex);
                $(el).ColorPickerHide();
            },
            onBeforeShow: function () {
                $(this).ColorPickerSetColor(this.value);
            }
        });
    }
}

function fillClrSmps() {
    for (var i in settings.colors) {
        $("#colorpicker" + i).val(settings.colors[i]);
        $("#clrsmp" + i).css("background-color", settings.colors[i]);
    }
}
