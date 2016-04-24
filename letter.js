/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Letter(x,y,c) {
    //this.colors = ["#828b20", "#b0ac31", "#cbc53d", "#fad779", "#f9e4ad", "#faf2db", "#563512", "#9b4a0b", "#d36600", "#fe8a00", "#f9a71f"];
                
    this.shape = new createjs.Shape();
    this.shape.graphics.beginFill(settings.colors[c]).drawRect(0, 0, settings.sts["LetterWidth"], settings.sts["LetterHeight"]);
    this.x = x;
    this.y = y;
    this.c = c;
    //this.shape.x = posx;
    //this.shape.y = posy;
    //this.lifeTime = 0;
};

//Letter.prototype.getSth = function(sth){
//    return sth * 3;
//};

Letter.prototype.update = function(){
    this.shape.graphics.clear();
    this.shape.graphics.beginFill(settings.colors[this.c]).drawRect(0, 0, settings.sts["LetterWidth"], settings.sts["LetterHeight"]);
    //console.log('asdf');
};

//class Letter2{
//    constructor(height, width) {
//        this.height = height;
//        this.width = width;
//    }  
//    
//    get area() {
//        return this.calcArea();
//    }
//
//    calcArea() {
//        return this.height * this.width;
//    }
//};

//Letter.prototype.update = function (ct) {
//    //this.lifeTime += ct;
//    //this.shape.alpha = 0.75 + (Math.sin(this.lifeTime * 8) * 0.25);
//};
      
