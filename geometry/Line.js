var Point = require('./Point.js');

/**
 * Represents a Line in a 2 axis base
 * The line is composed of two points
 */
exports.Line = function(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
}

exports.intersection = function(l1, l2) {
    res =  getIntersection(
        l1.getPoint1().getX(),
        l1.getPoint1().getY(),
        l1.getPoint2().getX(),
        l1.getPoint2().getY(),
        l2.getPoint1().getX(),
        l2.getPoint1().getY(),
        l2.getPoint2().getX(),
        l2.getPoint2().getY()
    );

    return new Point.Point(res[0], res[1]);
}

exports.Line.prototype.getPoint1 = function() {
    return this.p1;
}

exports.Line.prototype.getPoint2 = function() {
    return this.p2;
}