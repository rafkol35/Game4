
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
            if (e.keyCode !== 8) { // backspace dozwolony
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

//AAAAAAAAAC