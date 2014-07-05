// Closure to display a solidLine (capture the display interface i.e the networkCommunicationManager)
exports.createDisplayerFunc = function(networkCommunicationManager) {
    var networkCommunicationManager = networkCommunicationManager;

    return function(p, horizontalSpeed) {
        var millisecTime = new Date().getTime();

        // var subCircleX = p.getRayon() * 0.8 * Math.cos((millisecTime % 36000 * 1000) * (horizontalSpeed / 5) / -3000000000.);
        // var subCircleY = p.getRayon() * 0.8 * Math.sin((millisecTime % 36000 * 1000) * (horizontalSpeed / 5) / -3000000000.);

        var subCircleX = p.getRayon() * 0.8 * Math.cos((millisecTime % 36000 * 1000) * (horizontalSpeed / 5) / -3000000.);
        var subCircleY = p.getRayon() * 0.8 * Math.sin((millisecTime % 36000 * 1000) * (horizontalSpeed / 5) / -3000000.);

        networkCommunicationManager.drawCircle(p.getX() + subCircleX, p.getY() +  subCircleY, p.getRayon() / 2, 6);
        networkCommunicationManager.drawCircle(p.getX(), p.getY(), p.getRayon() * 2, 6);
    }
}
