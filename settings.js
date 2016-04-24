/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Settings{
    constructor(){
        this.sts = [];
        this.sts["PageSizeX"] = 20;
        this.sts["PageSizeY"] = 10;
        this.sts["LineSpace"] = 0;
        this.sts["LetterSpace"] = 0;
        this.sts["LetterWidth"] = 10;
        this.sts["LetterHeight"] = 15;        
        
        this.colors2 = ["#828b20", "#b0ac31", "#cbc53d", "#fad779", "#f9e4ad", "#faf2db", "#563512", "#9b4a0b", "#d36600", "#fe8a00", "#f9a71f"];
        this.canvasColor = "#ffffff";
        
        this.colors = [];
        for(var i = 65 ; i <= 90 ; ++i)
        {
            this.colors[i] = this.colors2[Math.random() * this.colors2.length | 0];
        }
        this.colors[65] = "#000000";
        this.colors[66] = "#ffffff";
        this.colors[67] = "#00ff00";
        
        //var KEYCODE_ENTER = 13;		//useful keycode
        //var KEYCODE_SPACE = 32;		//useful keycode
        //this.colors[13] = '';
        this.colors[32] = '#ffffff'
        this.colors[13] = '#ff0000'
        
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
    
    letterColorChange(wc,newColor){
        //console.log("lcc:"+$(wc).attr("id")+" " +newColor);
        
        var aid = $(wc).attr("id");
        var naid = aid.substr(11);
        //console.log(naid);
        this.colors[naid] = "#"+newColor;
        $("#clrsmp"+naid).css("background-color", this.colors[naid]);
        refreshAll();
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
    
    //$('#gameCanvase').val(this.canvasColor);
    $("#gameCanvas").css("background-color", settings.canvasColor);
    $("#colorpickerCanvas").val(settings.canvasColor);
    
    //console.log($("#colorpickerCanvas"));
    
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
    
//    $('#colorpickerSpace').ColorPicker({
//	onSubmit: function(hsb, hex, rgb, el) {
//            settings.letterColorChange(hex);
//            $(el).val("#"+hex);
//            $(el).ColorPickerHide();
//	},
//	onBeforeShow: function () {
//		$(this).ColorPickerSetColor(this.value);
//	}
//    })
    
//    .bind('keyup', function(){
//	$(this).ColorPickerSetColor(this.value);
//    });

//    var colorLetterPickersID = [];
//    //console.log( $('#colorSelector') );
//    var tc = $("#tableColors");
////    var newDt1 = newTr.add("td");
////    var newTr = tc.add("tr");
////    //newDt1.html("asdf");
////    var newDt2 = newTr.add("td");
////    //newDt2.html("qwer");

    //var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    //.each(alphabet, function(letter) { console.log(letter); });

    for(var l = 65 ; l <= 90 ; l++)
    {
        var _char = String.fromCharCode(l);
//        //console.log(_char);
//        //<tr><td>D</td><td><input type="text" maxlength="6" size="6" id="colorpicker68" value="ffffff" /></td></tr>                    
//        tc.append("<tr><td>"+_char+"</td><td><input type=\"text\" maxlength=\"6\" size=\"6\" id=\"colorpicker\""+l+" value=\"ffffff\" /></td></tr>");
        
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
	}
        })
    }

//    for( var i = 'A' ; i <= 'Z' ; ++i ){
////        <tr><td>D</td><td><input type="text" maxlength="6" size="6" id="colorpicker68" value="ffffff" /></td></tr>                    
//        tc.append("<tr><td>"+i+"</td><td>qwer</td></tr>");
//    }
    
     //$('input').ColorPicker(options);
//    $('#colorSelector').ColorPicker({
//	color: '#0000ff',
//	onShow: function (colpkr) {
//            //console.log('asdf');
//		$(colpkr).fadeIn(500);
//		return false;
//	},
//	onHide: function (colpkr) {
//		$(colpkr).fadeOut(500);
//		return false;
//	},
//	onChange: function (hsb, hex, rgb) {
//		$('#colorSelector div').css('backgroundColor', '#' + hex);
//	}
//    });
}