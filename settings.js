/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Settings{
    constructor(){
        this.sts = new Array();
        this.sts["PageSizeX"] = 50;
        this.sts["PageSizeY"] = 70;
        this.sts["LineSpace"] = 0;
        this.sts["LetterSpace"] = 0;
        this.sts["LetterWidth"] = 50;
        this.sts["LetterHeight"] = 50;        
        
//        this.PageSizeX = 50;
//        this.PageSizeY = 70;
//        this.LineSpace = 0;
//        this.LetterSpace = 0;
//        this.LetterWidth = 50;
//        this.LetterHeight = 50;  

        console.log(this.sts);
    }
    
    spinnerChange(wv,nv){
        this.sts[wv] = nv;
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
}