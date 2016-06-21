
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