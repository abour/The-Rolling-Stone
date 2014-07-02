var solidLineModule = require('./SolidLine.js');

/**
 * Perform the following taks :
 * - Remove useless lines (X position < 0)
 * - Check if new lines are needed. If so, they are generated (and added to the list)
 */
exports.generate = function(lineList) {
    // Check if there are useless lines
    lineList.forEach (function(l) {
        // If the line is no more visible on screen
        if (l.getLine().getPoint2().getX() < 0) {
            // Remove the line
            lineList.splice(lineList.indexOf(l), 1);
        }
    });

    // If there are no lines, add one
    if (lineList.length == 0) {
        var newLine = new solidLineModule.SolidLine(1000, 40000, 16000, 40000, -15000);
        lineList.push(newLine);
        exports.generate(lineList);
    }
    else {
        var lastLine = lineList[lineList.length - 1];
        // Check the position of the last line.
        // If it in screen bounds (already partially displayed) then generate a new one

        if (lastLine.getLine().getPoint1().getX() < 65535) {
            var generationInfo = generateNewLine(lastLine.getLine().getPoint2().getY(), lastLine.vx);
            addLineFromGenerationInfo(lineList, lastLine.getLine().getPoint2().getX(), generationInfo, lastLine.vx);
            exports.generate(lineList);
        }
    }
}

/**
 * Create a SolidLine from generationInfo and add it to the lineList
 */
function addLineFromGenerationInfo(lineList, lastLineX, generationInfo, v) {


    var newLine = new solidLineModule.SolidLine(lastLineX + generationInfo.distance,
                                                generationInfo.y,
                                                lastLineX + generationInfo.distance + generationInfo.width,
                                                generationInfo.y,
                                                v);
    lineList.push(newLine);
}

/**
 * Algorithm to generate a new Line
 * @param y : the "y" coordinate of the last generated line
 * @param v : the actual speed of the game
 * @return (y, distance, width) : The "y" position of the next line, its distance to the last one and its width
 */
function generateNewLine(y, v) {
    var newPosition = generatePosition(y, Math.random() < 0.5, v);
    var newDistance = generateDistance(Math.abs(y, newPosition), v);

    return {
        y : newPosition,
        distance : newDistance,
        width : generateWidth()
    };
}

function generateWidth() {
    var minWidth = 10000;
    var maxWidth = 40000;

    return getRandomArbitrary(minWidth, maxWidth);
}

/**
 * Generate the distance between to lines according the distance between last lines
 */
function generateDistance(generatedDiffPosition, v) {
    // Sign need to be > 0
    v = Math.abs(v);

    // Correct Value for a speed of 40000
    var minDistance = 15000;
    var maxDistance = 30000;

    // Adapt linearly according speed
    var factor = v / 40000;
    minDistance *= factor;
    maxDistance *= factor;

    return getRandomArbitrary(minDistance, maxDistance);
}

/**
 * Returns the position Y of the new line according the given direction and the speed
 */
function generatePosition(lastY, directionUp, v) {
    // Sign need to be > 0
    v = Math.abs(v);
    var minPosition = 15000;
    var maxPosition = 60000;
    var maxDiffTop = 15000;
    var maxDiffBottom = 35000;

    var factor = v / 30000;
    // Adapt the max height distance according the current speed
    maxDiffTop *= factor;
    if (maxDiffTop >= 20000) {
        maxDiffTop = 20000;
    }


    if (directionUp) {
        var maxDistance = Math.min(Math.abs(lastY - minPosition), maxDiffTop);
        return getRandomArbitrary(lastY, lastY - maxDistance);
    }
    else {
        var maxDistance = Math.min(Math.abs(lastY - maxPosition), maxDiffBottom);
        return getRandomArbitrary(lastY, lastY + maxDistance);
    }
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
    if (min <= max) {
        return Math.random() * (max - min) + min;
    }
    else {
        return Math.random() * (min - max) + max;
    }

}