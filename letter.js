/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Letter() {
    this.shape = new createjs.Shape();
    this.shape.graphics.beginFill("#ff0").drawRect(0, 0, 50, 50);
    //this.shape.x = posx;
    //this.shape.y = posy;
    //this.lifeTime = 0;
};

Letter.prototype.getSth = function(sth){
    return sth * 3;
};

class Letter2{
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }  
    
    get area() {
        return this.calcArea();
    }

    calcArea() {
        return this.height * this.width;
    }
};

//Letter.prototype.update = function (ct) {
//    //this.lifeTime += ct;
//    //this.shape.alpha = 0.75 + (Math.sin(this.lifeTime * 8) * 0.25);
//};
      
