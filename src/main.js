require('./css/style.css');
var $ = require('jquery');
//require('expose?$!expose?jQuery!jquery');
require('bootstrap-webpack');



$(function() {
    var Game = require('./js/game.js');
    var g = new Game($('#snakCanvas').get(0));
    g.play();
});
