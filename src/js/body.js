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
    }
}

module.exports = SnakBody;