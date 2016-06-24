function Letter(index,c) {
    this.shape = new createjs.Shape();
    this.shape.graphics.beginFill(settings.colors[c]).drawRect(0, 0, settings.sts["LetterWidth"], settings.sts["LetterHeight"]);
    this.index = index;
    this.c = c;    
};

Letter.prototype.updateAll = function () {
    var posx = this.index % settings.sts["PageSizeX"];
    var posy = Math.floor(this.index / settings.sts["PageSizeX"]);
    this.shape.x = posx * settings.sts["LetterWidth"];
    this.shape.y = posy * (settings.sts["LetterHeight"] + settings.sts["LineSpace"]);
    this.updateColor();
};

Letter.prototype.updateColor = function () {
    this.shape.graphics.clear();
    if(settings.colors[this.c] === undefined){
        this.shape.graphics.beginFill(settings.colors[-1]).drawRect(0, 0, settings.sts["LetterWidth"], settings.sts["LetterHeight"]);    
    }else{
        this.shape.graphics.beginFill(settings.colors[this.c]).drawRect(0, 0, settings.sts["LetterWidth"], settings.sts["LetterHeight"]);    
    }
};
