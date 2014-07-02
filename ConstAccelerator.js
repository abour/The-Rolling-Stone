/** Returns the new position of the object with
 * @param pos : position on axis
 * @param vel : velocity on axis
 * @param g : gravity Constant
 * @param deltaT : time elapsed since last framce
 * @returns : (newPosition, newVelocity)
 */
exports.computeNextStep = function(pos, vel, g, deltaT) {
    var newVel = vel + g * deltaT;
    var newPos = pos + newVel * deltaT;

    return {
        newPos : newPos,
        newVel : newVel
    };
}