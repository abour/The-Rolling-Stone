var Sphere = require("./geometry/Sphere.js");
var Point = require("./geometry/Point.js");

// Define a Player class
exports.Player = function (x, y, r, vx, vy) {
    this.s = new Sphere.Sphere(new Point.Point(x, y), r);
    this.vx = vx; // x velocity
    this.vy = vy; // y velocity
    this.numberOfJumpDone = 0; // Number of jump that have already been done
}

exports.Player.prototype.debug = function() {
    console.log("x : " + this.s.getCenter().getX());
    console.log("y : " + this.s.getCenter().getY());
    console.log("r : " + this.s.getRayon());
    console.log("vx : " + this.vx);
    console.log("vy : " + this.vy);
}

exports.Player.prototype.setX = function(x) {
    this.s.setX(x);
}

exports.Player.prototype.setY = function(y) {
    this.s.setY(y);
}

exports.Player.prototype.getX = function() {
    return this.s.getX();
}

exports.Player.prototype.getY = function() {
    return this.s.getY();
}

exports.Player.prototype.getRayon = function() {
    return this.s.getRayon();
}

exports.Player.prototype.getSphere = function() {
    return this.s;
}

// Key press management
exports.Player.prototype.jumpKeyPressed = function() {
    // Only 2 jumps are accepted (before touching a line again)
    if (this.numberOfJumpDone < 2) {
        this.vy = -50;
    }
    this.numberOfJumpDone++;
}

// Key release management
exports.Player.prototype.jumpKeyReleased = function() {
    if (this.numberOfJumpDone < 2) {
        this.vy = 0;
    }
}

// Player touched a line
exports.Player.prototype.lineTouched = function() {
    // Reset the number of jump
    this.numberOfJumpDone = 0;
//    this.vy = 0;
}