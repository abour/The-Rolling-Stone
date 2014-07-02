exports.Sphere = function(p, r) {
    this.p = p;
    this.r = r;
}

exports.Sphere.prototype.getCenter = function() {
    return this.p;
}

exports.Sphere.prototype.getRayon = function() {
    return this.r;
}

exports.Sphere.prototype.setX = function(x) {
    this.p.setX(x);
}

exports.Sphere.prototype.setY = function(y) {
    this.p.setY(y);
}

exports.Sphere.prototype.getX = function() {
    return this.p.getX();
}

exports.Sphere.prototype.getY = function() {
    return this.p.getY();
}