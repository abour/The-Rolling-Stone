var Line = require('./geometry/Line.js');
var Point = require('./geometry/Point.js');

exports.SolidLine = function(x1, y1, x2, y2, vx) {
    this.line = new Line.Line(new Point.Point(x1, y1), new Point.Point(x2, y2));
    this.vx = vx;
}

exports.SolidLine.prototype.debug = function() {
    console.log("x1 : " + this.line.getPoint1().getX());
    console.log("y1 : " + this.line.getPoint1().getY());
    console.log("x2 : " + this.line.getPoint2().getX());
    console.log("y2 : " + this.line.getPoint2().getY());
    console.log("v : " + this.vx);
}

exports.SolidLine.prototype.getLine = function() {
    return this.line;
}