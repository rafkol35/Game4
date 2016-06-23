var preload;
var canvas, stage;
var letters = new Array();
var cursorPosX = 0;
var cursorPosY = 0;
var ctta;

function canvasResize() {

}

function refreshCanvasSize() {
    settings.sts["PageSizeX"] = Math.floor(settings.sts["PageMaxSizeX"] / settings.sts["LetterWidth"]);
    //console.log(settings.sts["PageSizeX"]);
    canvas.width = settings.sts["PageSizeX"] * settings.sts["LetterWidth"];
    canvas.height = settings.sts["PageSizeY"] * (settings.sts["LetterHeight"] + settings.sts["LineSpace"]);

    ctta.attr('cols', Math.floor(settings.sts["PageSizeX"] * 7.46268));
    ctta.attr('rows', settings.sts["PageSizeY"]);

    var numberOfLetters = settings.sts["PageSizeX"] * settings.sts["PageSizeY"]
    //var abc = ['A', 'B', 'C'];
    if (letters.length < numberOfLetters) {
        for (var i = letters.length ; i < numberOfLetters ; ++i) {
            var letter = new Letter(i, ' ');
            stage.addChild(letter.shape);
            letter.updateAll();
            letters.push(letter);
        }
    } else if (letters.length > numberOfLetters) {
        while (letters.length > numberOfLetters) {
            console.log("usuwam");
            var letter = letters.pop();
            stage.removeChild(letter.shape);
        }
        // A RESZTA MUSI ZMIENIC POZYCJE
        for (var i = 0 ; i < letters.length ; ++i) {
            letters[i].updateAll();            
        }
    } else { //jak np... ustalona zostaje tylko wielkosc odstepu
        // A RESZTA MUSI ZMIENIC POZYCJE
        for (var i = 0 ; i < letters.length ; ++i) {
            letters[i].updateAll();
        }
    }
    //stage.update()
    cttaTextChanged2();
}

//var t0 = performance.now();
//doSomething();
//var t1 = performance.now();
//console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")

//var _allTime = 0.0;
//var _noa = 0;

function cttaTextChanged2() {
    //console.log("cttaTextChanged");
    // jeszcze pokusze sie o to aby obliczyc zajmowana przestrzen i nie wstawiac wiecej niz mozna...
    //if (this.value.length > 5) this.value = this.value.substr(0,5);
    //_noa++;

    //var t0 = performance.now();

    var sstsPSX = settings.sts["PageSizeX"];

    var textIndex = 0;
    var letterIndex = 0;
    if (ctta.val().length >= letters.length) {
        for (textIndex = 0 ; textIndex < ctta.value.length ; ++textIndex) {
            if (letterIndex >= letters.length) {
                ctta.value = ctta.value.substr(0, textIndex);
                break;
            }
            //var textChar = this.value[textIndex];
            letterIndex++;

            if (letterIndex >= letters.length) {
                this.value = this.value.substr(0, textIndex);
                break;
            }

            if (this.value[textIndex] === '\n') {
                //do konca lini wstawiamy puste znaki...
                var posx = letterIndex % sstsPSX;
                for (var lineIndex = posx ; lineIndex < sstsPSX; ++lineIndex) {
                    if (letterIndex >= letters.length) break;
                    //letters[letterIndex].c = ' ';
                    //letters[letterIndex].updateColor();
                    letterIndex++;
                }
            }
        }
    }
    textIndex = 0;
    letterIndex = 0;
    for (textIndex = 0 ; textIndex < ctta.val().length ; ++textIndex) {
        if (letterIndex >= letters.length) break;

        var textChar = ctta.val()[textIndex];
        if (letters[letterIndex].c !== textChar) {
            letters[letterIndex].c = textChar;
            letters[letterIndex].updateColor();
        }
        letterIndex++;
        if (letterIndex >= letters.length) break;

        if (textChar === '\n') {
            //do konca lini wstawiamy puste znaki...
            var posx = letterIndex % sstsPSX;
            for (var lineIndex = posx ; lineIndex < sstsPSX; ++lineIndex) {
                if (letterIndex >= letters.length) break;
                if (letters[letterIndex].c !== ' ') {
                    letters[letterIndex].c = ' ';
                    letters[letterIndex].updateColor();
                }
                letterIndex++;
            }
        }
    }
    // do konca dokumentu puste znaki
    for (; letterIndex < letters.length; ++letterIndex) {
        if (letters[letterIndex].c !== ' ') {
            letters[letterIndex].c = ' ';
            letters[letterIndex].updateColor();
        }
    }

    stage.update();

    //var t1 = performance.now();
    //console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")
    //_allTime += (t1 - t0);
}

function cttaTextChanged(event) {
    //console.log('cttaTextChanged');
    cttaTextChanged2();
}

function init() {
    ctta = $('#taCurrentText');
    ctta.on('input change keyup', cttaTextChanged);
    
    initSettings();

    if (!createjs.Sound.initializeDefaultPlugins()) {
        document.getElementById("error").style.display = "block";
        document.getElementById("content").style.display = "none";
        return;
    }
    canvas = document.getElementById("gameCanvas");
    stage = new createjs.Stage(canvas);
    //stage.autoClear = false;
    stage.enableDOMEvents(true);

    refreshCanvasSize();
}

//var fpsLabel;
var fps = 0;
var lt;

//function updateScene(event) {
//    var ct = createjs.Ticker.getTime();
//    var dt = ct - lt;
//    lt = ct;
//    if (isNaN(dt)) return;
//    stage.update();
//}

function randColors() {
    //console.log("Call to doSomething took " + _allTime + " milliseconds in " + _noa + " attemps." + _allTime / _noa);
    settings.randomizeColors();
    fillClrSmps();
    //refreshAll();
}

function fillColorsWithGradient() {
    settings.fillColorsWithGradient();
    fillClrSmps();
    //refreshAll();
}

function updateCurrentText() {

}
