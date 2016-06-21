var preload;
var canvas, stage;
var letters = new Array();
var cursorPosX = 0;
var cursorPosY = 0;
var ctta;

function canvasResize() {

}

function refreshAll() {
    //console.log("refreshAll");
    settings.sts["PageSizeX"] = Math.floor(settings.sts["PageMaxSizeX"] / settings.sts["LetterWidth"]);
    
    canvas.width = settings.sts["PageSizeX"] * settings.sts["LetterWidth"];
    canvas.height = settings.sts["PageSizeY"] * (settings.sts["LetterHeight"] + settings.sts["LineSpace"]);


    ctta.attr('cols', settings.sts["PageSizeX"]);
    ctta.attr('rows', settings.sts["PageSizeY"]);

    console.log(settings.sts["PageSizeX"]);
    console.log(settings.sts["PageSizeY"]);
    console.log(ctta.attr('cols'));
    console.log(ctta.attr('rows'));

    $("#currentText").html("");

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
    //this.value = this.value.substr(0, 10);
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

    //$("#gameCanvas").css("background-color", "yellow");

    //createjs.Ticker.timingMode = createjs.Ticker.RAF;
    //createjs.Ticker.addEventListener("tick", updateScene);
    stage.update();

    document.onkeydown = handleKeyDown;
    refreshAll();
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

function handleKeyDown(e) {
    return;

    //cross browser issues exist
    if (!e) {
        var e = window.event;
    }

    //if(panelCurrent !== panelGame) return;

    if (cursorPosY === settings.sts["PageSizeY"] - 1) { // jezeli kursor w ostatniej lini
        // enter nie moze byc wcale
        if (e.keyCode === 13) //enter
        {
            e.preventDefault();
            return false;
        }
        if (cursorPosX === settings.sts["PageSizeX"]) {
            if (e.keyCode !== 8){ // backspace dozwolony
                e.preventDefault();
                return false;
            }
        }
    }

    if (settings.colors[e.keyCode] !== undefined) {
        var letter = new Letter(cursorPosX, cursorPosY, e.keyCode);
        stage.addChild(letter.shape);
        letters.push(letter);
        if (cursorPosX === settings.sts["PageSizeX"] - 1 && cursorPosY !== settings.sts["PageSizeY"] - 1) {
            cursorPosX = 0;
            cursorPosY++;
        }
        else {
            cursorPosX++;
        }
        refreshAll();
        stage.update();
    }

    if (e.keyCode === 8) {
        if (letters.length > 0) {
            var lastLetter = letters[letters.length - 1];
            cursorPosX = lastLetter.x;
            cursorPosY = lastLetter.y;

            stage.removeChild(lastLetter.shape);
            letters.pop();
            //cursorPosX--;

            refreshAll();
        }
    }

    if (e.keyCode === 32 || e.keyCode === 8) {
        e.preventDefault();
        return false;
    }

    if (e.keyCode === 13) //enter
    {
        if (cursorPosX !== 0) cursorPosY++;
        cursorPosX = 0;
    }
}
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
