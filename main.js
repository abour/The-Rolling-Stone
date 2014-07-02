var networkCommunicationManager = require('./NetworkCommunicationManager.js');
var game = require('./Game.js');
var dgram = require('dgram');

networkCommunicationManager.start("The Rolling Stone", function (e) {
    switch (e.type) {
        case 'StartGame':
            console.log("Game State : running");
            if (game.isLaunched() == false) {
                game.start();
            }
            game.play();
            break;
        case 'StopGame':
            console.log("Game State : paused");
            game.pause();
            break;
        case 'KeyPressed':
            game.keyPressed(e.key);
            break;
    }
});

