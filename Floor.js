var Line = require('./geometry/Line.js');
var Point = require('./geometry/Point.js');

// The floor
exports.Floor = function(verticalPosition) {
    this.line = new Line.Line(new Point.Point(0,verticalPosition), new Point.Point(65535, verticalPosition));
}

exports.Floor.prototype.getLine = function() {
    return this.line;
}