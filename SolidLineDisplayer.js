// Closure to display a player (capture the display interface i.e the networkCommunicationManager)
exports.createDisplayerFunc = function(networkCommunicationManager) {
    var networkCommunicationManager = networkCommunicationManager;

    return function(solidLine) {
        networkCommunicationManager.drawLine(adjust(solidLine.getLine().getPoint1().getX()),
                                             adjust(solidLine.getLine().getPoint1().getY()),
                                             adjust(solidLine.getLine().getPoint2().getX()),
                                             adjust(solidLine.getLine().getPoint2().getY()),
                                             5);
    }
}

// Adjust a coordinate. If a part of a line is outside the screen, resize the line to fit de screen bounds.
function adjust(val) {
    if (val < 0) {
        return 0;
    }
    else if (val > 65535) {
        return 65535;
    }
    else {
        return val;
    }
}