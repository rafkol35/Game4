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
    canvas.width = settings.sts["PageSizeX"] * settings.sts["LetterWidth"];
    canvas.height = settings.sts["PageSizeY"] * (settings.sts["LetterHeight"] + settings.sts["LineSpace"]);

    ctta.attr('cols', Math.floor(settings.sts["PageSizeX"] * 7.46268));
    ctta.attr('rows', settings.sts["PageSizeY"]);
}

function refreshAll() {
    settings.sts["PageSizeX"] = Math.floor(settings.sts["PageMaxSizeX"] / settings.sts["LetterWidth"]);
    
    canvas.width = settings.sts["PageSizeX"] * settings.sts["LetterWidth"];
    canvas.height = settings.sts["PageSizeY"] * (settings.sts["LetterHeight"] + settings.sts["LineSpace"]);

    ctta.attr('cols', Math.floor(settings.sts["PageSizeX"] * 7.46268));
    ctta.attr('rows', settings.sts["PageSizeY"]);

    return;

    console.log(settings.sts["PageSizeX"]);
    console.log(settings.sts["PageSizeY"]);
    console.log(ctta.attr('cols'));
    console.log(ctta.attr('rows'));

    var newLineCntr = 0;
    var currentString = "";

    var newCursorX = 0;
    var newCursorY = 0;

    for (var i = 0 ; i < letters.length ; ++i) {
        var letter = letters[i];
        letter.update();

        //letter.shate.cache(0,0,settings.sts["LetterWidth"],settings.sts["LetterHeight"])

        if (newLineCntr > 0 && (newLineCntr % settings.sts["PageSizeX"] === 0)) {
            $("#currentText").html($("#currentText").html() + "<br />");
            newLineCntr = 0;
            newCursorX = 0;
            newCursorY++;

            letter.x = newCursorX;
            letter.y = newCursorY;
        }
        if (letter.c === 13) {
            //currentString += String.fromCharCode(letter.c);
            $("#currentText").html($("#currentText").html() + "<br />");
            newLineCntr = 0;
            newCursorX = 0;
            newCursorY++;

            letter.x = newCursorX;
            letter.y = newCursorY;

        } else if (letter.c === 32) {
            $("#currentText").html($("#currentText").html() + "&nbsp;");

            letter.x = newCursorX;
            letter.y = newCursorY;

            newLineCntr++;
            newCursorX++;
        } else {
            $("#currentText").html($("#currentText").html() + String.fromCharCode(letter.c));

            letter.x = newCursorX;
            letter.y = newCursorY;

            newCursorX++;
            newLineCntr++;
        }

        letter.shape.x = letter.x * settings.sts["LetterWidth"];
        letter.shape.y = letter.y * (settings.sts["LetterHeight"] + settings.sts["LineSpace"]);
    }

    cursorPosX = newCursorX;
    cursorPosY = newCursorY;
}

function cttaTextChanged(newText) {
    console.log(this.value.length);
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


    //var lastLetter = letters[letters.length - 1];
    //cursorPosX = lastLetter.x;
    //cursorPosY = lastLetter.y;
    //stage.removeChild(lastLetter.shape);
    //letters.pop();

    //$("#gameCanvas").css("background-color", "yellow");

    //createjs.Ticker.timingMode = createjs.Ticker.RAF;
    //createjs.Ticker.addEventListener("tick", updateScene);
    stage.update();

    //document.onkeydown = handleKeyDown;
    refreshCanvasSize();

    //var letter1 = new Letter(0, 'A');
    //stage.addChild(letter1.shape);
    //letter1.updateAll();
    ////letters.push(letter);
    //
    //var letter2 = new Letter(1, 'B');
    //stage.addChild(letter2.shape);
    //letter2.updateAll();

    var numberOfLetters = settings.sts["PageSizeX"] * settings.sts["PageSizeY"]
    var abc = ['A', 'B', 'C'];
    
    for (var i = 0 ; i < numberOfLetters-1 ; ++i) {

        var i2 = Math.floor((Math.random() * 3));
        var letter2 = new Letter(i, abc[i2]);
        stage.addChild(letter2.shape);
        letter2.updateAll();
    }

    //letters.push(letter);

    stage.update();
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
    settings.randomizeColors();
    fillClrSmps();
    refreshAll();
}

function fillColorsWithGradient() {
    settings.fillColorsWithGradient();
    fillClrSmps();
    refreshAll();
}

function updateCurrentText() {

}
