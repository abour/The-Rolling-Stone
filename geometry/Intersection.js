
// Simplification for horizontal line
exports.sphereLineIntersection = function(s, l) {

    if ((s.getCenter().getX() + s.getRayon() >= l.getPoint1().getX())
        && (s.getCenter().getX() - s.getRayon() <= l.getPoint2().getX())
        && (s.getCenter().getY() + s.getRayon() >= l.getPoint1().getY())
        && (s.getCenter().getY() - s.getRayon() <= l.getPoint1().getY())
    ) {
        return true;
    }
    else {
        return false;
    }
}