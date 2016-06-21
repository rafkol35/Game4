function Letter(index,c) {
    //this.colors = ["#828b20", "#b0ac31", "#cbc53d", "#fad779", "#f9e4ad", "#faf2db", "#563512", "#9b4a0b", "#d36600", "#fe8a00", "#f9a71f"];              
    //console.log("Letter:" + settings.colors[c]);    
    this.shape = new createjs.Shape();
    this.shape.graphics.beginFill(settings.colors[c]).drawRect(0, 0, settings.sts["LetterWidth"], settings.sts["LetterHeight"]);
    //this.x = x;
    //this.y = y;
    this.index = index;
    this.c = c;
    //this.shape.x = posx;
    //this.shape.y = posy;
    //this.lifeTime = 0;
};

//Letter.prototype.getSth = function(sth){
//    return sth * 3;
//};

Letter.prototype.updateAll = function () {
    var posx = this.index % settings.sts["PageSizeX"];
    var posy = Math.floor(this.index / settings.sts["PageSizeX"]);
    this.shape.x = posx * settings.sts["LetterWidth"];
    this.shape.y = posy * (settings.sts["LetterHeight"] + settings.sts["LineSpace"]);
    this.updateColor();
};

Letter.prototype.updateColor = function () {
    //console.log(settings.colors[this.c]);
    this.shape.graphics.clear();
    this.shape.graphics.beginFill(settings.colors[this.c]).drawRect(0, 0, settings.sts["LetterWidth"], settings.sts["LetterHeight"]);
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
      
