/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function hex2rgb(hexStr){
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

class Settings{
    constructor(){
        this.sts = [];
        this.sts["PageSizeX"] = 20;
        this.sts["PageSizeY"] = 10;
        this.sts["LineSpace"] = 0;
        this.sts["LetterSpace"] = 0;
        this.sts["LetterWidth"] = 10;
        this.sts["LetterHeight"] = 15;        
        
        //this.colors2 = ["#828b20", "#b0ac31", "#cbc53d", "#fad779", "#f9e4ad", "#faf2db", "#563512", "#9b4a0b", "#d36600", "#fe8a00", "#f9a71f"];
        this.canvasColor = "#ffffff";
        
        this.colors = [];
        this.randomizeColors();
        
        this.gradientFromColor = "#ff0000";
        this.gradientToColor = "#00ff00";
        
        //this.colors[65] = "#000000";
        //this.colors[66] = "#ffffff";
        //this.colors[67] = "#00ff00";
        
        //var KEYCODE_ENTER = 13;		//useful keycode
        //var KEYCODE_SPACE = 32;		//useful keycode
        //this.colors[13] = '';
        this.colors[32] = '#ffffff';
        this.colors[13] = '#ff0000';
        
//        this.PageSizeX = 50;
//        this.PageSizeY = 70;
//        this.LineSpace = 0;
//        this.LetterSpace = 0;
//        this.LetterWidth = 50;
//        this.LetterHeight = 50;  

        //console.log(this.sts);
    }
    
    spinnerChange(wv,nv){
        this.sts[wv] = nv;
        refreshAll();
    }
    
    canvasColorChange(newColor){
        //console.log('ccc');
        this.canvasColor = "#"+newColor;
        $("#gameCanvas").css("background-color", this.canvasColor);
        //refreshAll();
    }
    
    gradientFromColorChange(newColor){
        this.gradientFromColor = "#"+newColor;
        $("#clrsmpGradientFrom").css("background-color", settings.gradientFromColor);    
    }
    gradientToColorChange(newColor){
        this.gradientToColor = "#"+newColor;        
        $("#clrsmpGradientTo").css("background-color", settings.gradientToColor);
    }
    
    letterColorChange(wc,newColor){
        //console.log("lcc:"+$(wc).attr("id")+" " +newColor);
        
        var aid = $(wc).attr("id");
        var naid = aid.substr(11);
        //console.log(naid);
        this.colors[naid] = "#"+newColor;
        $("#clrsmp"+naid).css("background-color", this.colors[naid]);
        refreshAll();
    }
    
    randomizeColors(){
        for(var i = 65 ; i <= 90 ; ++i)
        {
            this.colors[i] = '#'+Math.floor(Math.random()*16777215).toString(16); //this.colors2[Math.random() * this.colors2.length | 0];
        }
    }
    
    fillColorsWithGradient(){
        var from = hex2rgb(this.gradientFromColor);       
        //console.log(from);
        var to = hex2rgb(this.gradientToColor);
        //console.log(to);

        var numColors = 90 - 65;
        
        var rFrom = from[0];
        var gFrom = from[1];
        var bFrom = from[2];
        
        var rdiff = 0;
        if( to[0] > from[0] ) rdiff = to[0] - from[0];
        else{ 
            rdiff = from[0] - to[0];
            rFrom = to[0];
        }
        
        var gdiff = 0;
        if( to[1] > from[1] ) gdiff = to[1] - from[1];
        else { 
            gdiff = from[1] - to[1];
            gFrom = to[1];
        }
        
        var bdiff = 0;
        if( to[2] > from[2] ) bdiff = to[2] - from[2];
        else {
            bdiff = from[2] - to[2];
            bFrom = to[2];
        }
        
        var rStep = rdiff / numColors;
        var gStep = gdiff / numColors;
        var bStep = bdiff / numColors;
        
        var cntr = 0;
        for(var i = 65 ; i <= 90 ; ++i)
        {
            var rgbStr = "rgb(" + Math.ceil(rFrom + cntr*rStep) + "," + Math.ceil(gFrom + cntr*gStep) + "," + Math.ceil(bFrom + cntr*bStep) + ")";
            //console.log( rgb2hex(rgbStr) );
            this.colors[i] = rgb2hex(rgbStr);
            //this.colors[i] = '#'+Math.floor(Math.random()*16777215).toString(16);
            cntr++;
        }
    }
};

var settings = new Settings();

function fff(setID, val){
    //console.log(spinner);
    settings.spinnerChange(setID,val);
}

function initSettings(){
    var spinner;
            
    spinner = $( "#spinnerPageSizeX" ).spinner();
    spinner.spinner( "option", "min", 10 );
    spinner.spinner( "option", "max", 50 );
    spinner.spinner( "value", settings.sts["PageSizeX"] );
    spinner.on( "spinchange", function( event, ui ) { fff("PageSizeX",ui.value); } );
    spinner.on( "spin", function( event, ui ) { fff("PageSizeX",ui.value); } );
    
    spinner = $( "#spinnerPageSizeY" ).spinner();
    spinner.spinner( "option", "min", 10 );
    spinner.spinner( "option", "max", 70 );
    spinner.spinner( "value", settings.sts["PageSizeY"] );
    spinner.on( "spinchange", function( event, ui ) { fff("PageSizeY",ui.value); } );
    spinner.on( "spin", function( event, ui ) { fff("PageSizeY",ui.value); } );
    
    spinner = $( "#spinnerLineSpace" ).spinner();
    spinner.spinner( "option", "min", 0 );
    spinner.spinner( "option", "max", 50 );
    spinner.spinner( "value", settings.sts["LineSpace"] );
    spinner.on( "spinchange", function( event, ui ) { fff("LineSpace",ui.value); } );
    spinner.on( "spin", function( event, ui ) { fff("LineSpace",ui.value); } );
    
    spinner = $( "#spinnerLetterSpace" ).spinner();
    spinner.spinner( "option", "min", 0 );
    spinner.spinner( "option", "max", 20 );
    spinner.spinner( "value", settings.sts["LetterSpace"] );
    spinner.on( "spinchange", function( event, ui ) { fff("LetterSpace",ui.value); } );
    spinner.on( "spin", function( event, ui ) { fff("LetterSpace",ui.value); } );
    
    spinner = $( "#spinnerLetterWidth" ).spinner();
    spinner.spinner( "option", "min", 10 );
    spinner.spinner( "option", "max", 50 );
    spinner.spinner( "value", settings.sts["LetterWidth"] );
    spinner.on( "spinchange", function( event, ui ) { fff("LetterWidth",ui.value); } );
    spinner.on( "spin", function( event, ui ) { fff("LetterWidth",ui.value); } );
    
    spinner = $( "#spinnerLetterHeight" ).spinner();
    spinner.spinner( "option", "min", 10 );
    spinner.spinner( "option", "max", 50 );
    spinner.spinner( "value", settings.sts["LetterHeight"] );
    spinner.on( "spinchange", function( event, ui ) { fff("LetterHeight",ui.value); } );
    spinner.on( "spin", function( event, ui ) { fff("LetterHeight",ui.value); } );
    
    $("#gameCanvas").css("background-color", settings.canvasColor);
    $("#colorpickerCanvas").val(settings.canvasColor);
    
    $('#colorpickerCanvas').ColorPicker({
	onSubmit: function(hsb, hex, rgb, el) {
            settings.canvasColorChange(hex);
            $(el).val("#"+hex);
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
	onSubmit: function(hsb, hex, rgb, el) {
            settings.gradientFromColorChange(hex);
            $(el).val("#"+hex);
            $(el).ColorPickerHide();
	},
	onBeforeShow: function () {
		$(this).ColorPickerSetColor(this.value);
	}
    })
    $('#colorpickerGradientTo').ColorPicker({
	onSubmit: function(hsb, hex, rgb, el) {
            settings.gradientToColorChange(hex);
            $(el).val("#"+hex);
            $(el).ColorPickerHide();
	},
	onBeforeShow: function () {
		$(this).ColorPickerSetColor(this.value);
	}
    })
    
    for(var l = 65 ; l <= 90 ; l++)
    {
        $("#colorpicker"+l).val(settings.colors[l]);
        $("#clrsmp"+l).css("background-color", settings.colors[l]);
        //console.log($("#colorpicker"+l));
        
        $("#colorpicker"+l).ColorPicker({
	onSubmit: function(hsb, hex, rgb, el) {
            settings.letterColorChange(el,hex);
            $(el).val("#"+hex);
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

function fillClrSmps(){
    for(var l = 65 ; l <= 90 ; l++){
        $("#colorpicker"+l).val(settings.colors[l]);
        $("#clrsmp"+l).css("background-color", settings.colors[l]);        
    }
}