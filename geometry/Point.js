/**
 * Represents a point in a 2 axis base
 */
exports.Point = function(x, y) {
    this.x = x;
    this.y = y;
}

/**
 * @return x : the x coordinate
 */
exports.Point.prototype.getX = function() {
    return this.x;
}

/**
 * @return y : the y coordinate
 */
exports.Point.prototype.getY = function() {
    return this.y;
}

exports.Point.prototype.setX = function(x) {
    this.x = x;
}

exports.Point.prototype.setY = function(y) {
    this.y = y;
}