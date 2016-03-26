var $ = require('jquery');

var SnakBody = require('./body.js');
var Frames = require('./frames.js');

const S_UP = 0;
const S_DOWN = 1;
const S_LEFT = 2;
const S_RIGHT = 3;
const S_WIDTH = 640;
const S_HEIGHT = 480;
const S_SIZE = 16;


function Game(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.bodys = [];
    this.foods = [];
    this.direction = S_DOWN;
    this.init();
    this.dist = 0;
    this.speed = 100; // move 100 pixels per second
    this.frames = new Frames(function() {
        this.update();
        this.render();
    }.bind(this));
}

Game.prototype = {
    init: function() {
        for (i = 0; i < 9; i++) {
            this.bodys.push(new SnakBody(i * S_SIZE, 0, S_SIZE, '#ff0000'));
        }

        this.foods.push(this.newFood());

        $(document).keydown(this.onKeyDown.bind(this));
    },

    clear: function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    update: function() {
        var dist = this.frames.delta * this.speed;
        if (dist > 0) {
            this.dist += dist;
        }

        if (this.dist > S_SIZE) {
            var food = this.foods[0];
            this.bodys.push(this.newBody());
            if (!this.isTouched(food)) {
                this.bodys.shift();
            }
            else {
                this.foods.shift();
                this.foods.push(this.newFood());
            }
            this.dist = 0;
        }
    },

    render: function() {
        this.clear();
        this.drawBorder();
        this.drawBody();
        this.drawFood();
    },

    drawBorder: function() {
        this.ctx.save();
        this.ctx.strokeStyle = '#fff';
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(S_WIDTH, 0);
        this.ctx.lineTo(S_WIDTH, S_HEIGHT);
        this.ctx.lineTo(0, S_HEIGHT);
        this.ctx.lineTo(0, 0);
        this.ctx.stroke();
        this.ctx.restore();
    },

    drawBody: function() {
        for (var i = 0; i < this.bodys.length; i++) {
            this.bodys[i].draw(this.ctx);
        }
    },

    drawFood: function() {
        for (var i = 0; i < this.foods.length; i++) {
            this.foods[i].draw(this.ctx);
        }
    },

    newFood: function() {
        var x = Math.floor(Math.random() * (S_WIDTH / S_SIZE));
        var y = Math.floor(Math.random() * (S_HEIGHT / S_SIZE));

        var body = new SnakBody(x * S_SIZE, y * S_SIZE, S_SIZE, '#ffff00')

        return this.isTouched(body) ? this.newFood() : body;
    },

    newBody: function() {
        var x = y = 0;
        var curHead = this.bodys[this.bodys.length - 1];

        switch (this.direction) {
            case S_UP:
                x = curHead.x;
                y = curHead.y - S_SIZE;
                break;
            case S_DOWN:
                x = curHead.x;
                y = curHead.y + S_SIZE;
                break;
            case S_LEFT:
                x = curHead.x - S_SIZE;
                y = curHead.y;
                break;
            case S_RIGHT:
                x = curHead.x + S_SIZE;
                y = curHead.y;
                break;
            default: break;
        }

        if (x < 0) x += S_WIDTH; else x %= S_WIDTH;
        if (y < 0) y += S_HEIGHT; else y %= S_HEIGHT;

        return new SnakBody(x, y, S_SIZE, curHead.color);
    },

    isTouched: function(body) {
        for (var i = this.bodys.length - 1; i >= 0; i--) {
            if (this.bodys[i].intersect(body)) {
                return true;
            }
        }
        return false;
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
            case 87: // W
            case 38: // up 
                if (this.direction != S_DOWN) {
                    this.direction = S_UP;
                }
                break;

            case 83: // S
            case 40: // down
                if (this.direction != S_UP) {
                    this.direction = S_DOWN;
                }
                break;

            case 65: // A
            case 37: // left
                if (this.direction != S_RIGHT) {
                    this.direction = S_LEFT;
                }
                break;

            case 68: // D
            case 39: // right
                if (this.direction != S_LEFT) {
                    this.direction = S_RIGHT;
                }
                break;

            default: break;
        }
    }
}

module.exports = Game;