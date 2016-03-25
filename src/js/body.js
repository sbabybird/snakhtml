const S_UP = 0;
const S_DOWN = 1;
const S_LEFT = 2;
const S_RIGHT = 3;
const S_WIDTH = 640;
const S_HEIGHT = 480;

function SnakBody(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
}

SnakBody.prototype = {
    draw: function(ctx) {
        if (ctx) {
            ctx.save();
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.size, this.size);
            ctx.restore();
        }
    },

    getNewBody: function(direction) {
        var x = y = 0;

        switch (direction) {
            case S_UP:
                x = this.x;
                y = this.y - this.size;
                break;
            case S_DOWN:
                x = this.x;
                y = this.y + this.size;
                break;
            case S_LEFT:
                x = this.x - this.size;
                y = this.y;
                break;
            case S_RIGHT:
                x = this.x + this.size;
                y = this.y;
                break;
            default: break;
        }

        if (x < 0) x += S_WIDTH; else x %= S_WIDTH;
        if (y < 0) y += S_HEIGHT; else y %= S_HEIGHT;

        return new SnakBody(x, y, this.size, this.color);
    }
}

module.exports = SnakBody;