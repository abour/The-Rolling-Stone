var dgram = require('dgram');

var host = "127.0.0.1";
var port = 4242;
var gameId = -1;
var client = null; // The client socket

exports.start = function(gameName, callback) {
    var message = createAskForIdMessage(gameName);


    client = dgram.createSocket("udp4", function(res) {
        var actionType =  parse(res);

        // Check the action is parsed
        if (actionType === null)
            return;

        switch (actionType.type) {
            case 'GameIdReceived':
                gameId = actionType.gameId;
                break;
            case 'StartGame':
            case 'StopGame':
            case 'KeyPressed':
                callback(actionType);
                break;
        }
    });

    client.send(message, 0, message.length, port, host, function(err, bytes) {
    });
}

exports.drawLine = function(x1, y1, x2, y2, colorCode) {
    if (!(checkInterval(x1) && checkInterval(y1) && checkInterval(x2) && checkInterval(y2))) {
        return;
    }

    var message = createDrawLineMessage(gameId, x1, y1, x2, y2, colorCode);
    client.send(message, 0, message.length, port, host);
}

exports.drawRectangle = function(x1, y1, x2, y2, colorCode) {
    if (!(checkInterval(x1) && checkInterval(y1) && checkInterval(x2) && checkInterval(y2))) {
        return;
    }

    var message = createDrawRectangleMessage(gameId, x1, y1, x2, y2, colorCode);
    client.send(message, 0, message.length, port, host);
}

exports.drawCircle = function(x, y, diameter, colorCode) {
    if (!(checkInterval(x + diameter) && checkInterval(x - diameter)
        && checkInterval(y + diameter) && checkInterval(y - diameter))) {
            return
        }

    var message = createDrawCircleMessage(gameId, x, y, diameter, colorCode);
    client.send(message, 0, message.length, port, host);
}

exports.refreshScreen = function() {
    var message = createRefreshScreenMessage(gameId);
    client.send(message, 0, message.length, port, host);
}

exports.selfStop = function() {
    var message = createSelfStopMessage(gameId);
    client.send(message, 0, message.length, port, host);
}

function createAskForIdMessage(gameName) {
    var message = new Buffer(3 + gameName.length) ;

    message.writeUInt8(0, 0); // 0
    message.writeUInt8(72, 1); // H
    message.write(gameName, 2, gameName.length, 'ascii');
    message.writeUInt8(0, message.length - 1); // 0

    return message;
}

function createDrawLineMessage(gameId, x1, y1, x2, y2, colorCode) {
    var message = new Buffer(11);

    message.writeUInt8(gameId, 0); // gameId
    message.writeUInt8(76, 1); // L
    message.writeUInt16LE(Math.floor(x1), 2);
    message.writeUInt16LE(Math.floor(y1), 4);
    message.writeUInt16LE(Math.floor(x2), 6);
    message.writeUInt16LE(Math.floor(y2), 8);
    message.writeUInt8(colorCode, 10);

    return message;
}

function createDrawRectangleMessage(gameId, x1, y1, x2, y2, colorCode) {
    var message = new Buffer(11);

    message.writeUInt8(gameId, 0); // gameId
    message.writeUInt8(68, 1); // L
    message.writeUInt16LE(Math.floor(x1), 2);
    message.writeUInt16LE(Math.floor(y1), 4);
    message.writeUInt16LE(Math.floor(x2), 6);
    message.writeUInt16LE(Math.floor(y2), 8);
    message.writeUInt8(colorCode, 10);

    return message;
}

function createDrawCircleMessage(gameId, x, y, diameter, colorCode) {
    var message = new Buffer(9);

    message.writeUInt8(gameId, 0); // gameId
    message.writeUInt8(67, 1); // C
    message.writeUInt16LE(Math.floor(x), 2);
    message.writeUInt16LE(Math.floor(y), 4);
    message.writeUInt16LE(Math.floor(diameter), 6);
    message.writeUInt8(colorCode, 8);

    return message;
}

function createRefreshScreenMessage(gameId) {
    var message = new Buffer(2);
    message.writeUInt8(gameId, 0); // gameId
    message.writeUInt8(82, 1); // R

    return message;
}

function createSelfStopMessage(gameId) {
    var message = new Buffer(2);
    message.writeUInt8(gameId, 0); // gameId
    message.writeUInt8(83, 1); // S

    return message;
}

function parse(rawaction) {
    action = rawaction.slice(0, 1).toString('ascii');

	switch(action) {
		case 'G':
			return {
				type: 'StartGame',
			};
			break;
	    case 'S':
	        return  {
	            type: 'StopGame'
	        };
            break;
        case 'A':
            return {
                type: 'GameIdReceived',
                gameId: rawaction.readUInt8(1)
            }
        case 'I':
            return {
                type: 'KeyPressed',
                key: rawaction.readUInt16LE(1)
            }

            break;
        default:
            return null;
    }
}

function checkInterval(value) {
    return value >= 0 && value <= 65535;
}