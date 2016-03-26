var $ = require('jquery');

var SnakBody = require('./body.js');
var Frames = require('./frames.js');

const S_UP = 0;
const S_DOWN = 1;
const S_LEFT = 2;
const S_RIGHT = 3;
const S_WIDTH = 640;
const S_HEIGHT = 480;


function Game(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.bodys = [];
    this.direction = S_DOWN;
    $(this.canvas).keydown(this.onKeyDown);
    this.frames = new Frames(function() {
        this.update();
        this.render();
    }.bind(this));
    this.init();
}

Game.prototype = {
    init: function() {
        for (i = 0; i < 9; i++) {
            this.bodys.push(new SnakBody(i * 16, 0, 16, '#ff0000'));
        }
        
        $(document).keydown(this.onKeyDown.bind(this));
    },

    clear: function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    update: function() {
        this.bodys.push(this.bodys[this.bodys.length - 1].getNewBody(this.direction));
        this.bodys.shift();
    },

    render: function() {
        this.clear();
        for (var i = 0; i < this.bodys.length; i++) {
            this.bodys[i].draw(this.ctx);
        }
    },

    play: function() {
        this.frames.play();
    },

    pause: function() {
        this.frames.pause();
    },

    onKeyDown: function(e) {
        var key = e.keyCode || e.which || e.charCode;
        switch (key) {
            case 87:
            case 38: this.direction = S_UP; return;
            case 83:
            case 40: this.direction = S_DOWN; return;
            case 65:
            case 37: this.direction = S_LEFT; return;
            case 68:
            case 39: this.direction = S_RIGHT; return;
            default: return;
        }
    }
}

module.exports = Game;