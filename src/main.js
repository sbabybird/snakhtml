require('./css/style.css');
var $ = require('jquery');
require('bootstrap');

$(function() {
    var Game = require('./js/game.js');
    var g = new Game($('#snakCanvas').get(0));
    g.play();
});
