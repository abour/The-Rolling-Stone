var networkCommunicationManager = require('./NetworkCommunicationManager.js');
var playerDisplayerModule = require('./PlayerDisplayer.js');
var solidLineDisplayerModule = require('./SolidLineDisplayer.js');
var solidLineModule = require('./SolidLine.js');
var playerModule = require('./Player.js');
var acceleratorModule = require('./ConstAccelerator.js');
var lineGenerator = require('./LineGenerator.js');
var Intersection = require('./geometry/Intersection.js');
var Floor = require('./Floor.js');
var FloorDisplayer = require('./FloorDisplayer.js');
var GameConfig = require('./GameConfig.js');

var player = new playerModule.Player(10000, 40000, 3000, 0, 0);
var lineList = new Array();
var floor = new Floor.Floor(65435);

var playerDisplayer = playerDisplayerModule.createDisplayerFunc(networkCommunicationManager);
var solidLineDisplayer = solidLineDisplayerModule.createDisplayerFunc(networkCommunicationManager);
var floorDisplayer = FloorDisplayer.createDisplayerFunc(networkCommunicationManager);

var isLaunched = false; // If the game was already launched
var isRunning = false; // If the game is running (or paused)

function update() {
    if (isRunning == true) {

        lineGenerator.generate(lineList);
        applyAcceleration();
        testIntersection();
        display();
    }
}

/**
 * Display all the visible game objects
 */
function display() {
    // Display the player
    if (lineList.length > 0) {
        playerDisplayer(player, lineList[0].vx);
    }

    // Display all lines
    lineList.forEach(function(line) {
        solidLineDisplayer(line);
    });

    floorDisplayer(floor);

    // Refresh the screen
    networkCommunicationManager.refreshScreen();
}

function applyAcceleration() {
    var playerNextStep = acceleratorModule.computeNextStep(player.getY(), player.vy, 9.8 * 0.01, 1000. / GameConfig.FPS);

    player.setY(playerNextStep.newPos);
    player.vy = playerNextStep.newVel;

    var vel = 0;

    lineList.forEach(function(l) {
        var lineNextStep1 = acceleratorModule.computeNextStep(l.getLine().getPoint1().getX(), l.vx, -9.8 / 40000 , 1000. / GameConfig.FPS);
        var lineNextStep2 = acceleratorModule.computeNextStep(l.getLine().getPoint2().getX(), l.vx, -9.8 / 40000 , 1000. / GameConfig.FPS);
        l.getLine().getPoint1().setX(lineNextStep1.newPos);
        l.getLine().getPoint2().setX(lineNextStep2.newPos);
        l.vx = lineNextStep1.newVel;
        vel = lineNextStep1.newVel;
    });
}

function testIntersection() {
    // Test the collision between the player and lines
    lineList.forEach(function(solidLine) {
        if (Intersection.sphereLineIntersection(player.getSphere(), solidLine.getLine())) {
            if (player.vy > 0) {
                // Correct the player position to the top of the line
                player.getSphere().getCenter().setY(solidLine.getLine().getPoint1().getY() - player.getSphere().getRayon() - 1);
                // Invert the velocity vector
                player.vy = - player.vy / 2;
                player.lineTouched();

            }
            else {
                // Correct the position (bottom of the line)
                player.getSphere().getCenter().setY(solidLine.getLine().getPoint1().getY() + player.getSphere().getRayon() - 1);
                // Invert the velocity vector
                player.vy = - player.vy / 2;
            }
        }
    });

    // Test the collision between the player and ground
    if (Intersection.sphereLineIntersection(player.getSphere(), floor.getLine())) {
        restart();
    }
}

exports.start = function(keyboardCallback) {
    isLaunched = true;
    setInterval(update, 1000 / GameConfig.FPS);
}

exports.play = function() {
    isRunning = true;
}

exports.pause = function() {
    isRunning = false;
}

exports.isRunning = function() {
    return isRunning;
}

exports.isLaunched = function() {
    return isLaunched;
}

restart = function() {
    player = new playerModule.Player(10000, 40000, 3000, 0, 0);
    lineList = new Array();
}

exports.keyPressed = function(key) {
    if (isRunning) {
        if (key == 256) { // 'A' key player1. 'H' on keyboard
            player.jumpKeyPressed();
        }
        if (key == 0) {
            player.jumpKeyReleased();
        }
        if (key == 512) { // 'B' key player1. 'G' on keyboard
            restart();
        }
    }
}