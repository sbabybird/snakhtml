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
            ctx.fillRect(this.x+1, this.y+1, this.size-1, this.size-1);
            ctx.restore();
        }
    },
    
    intersect: function(other) {
        return (other.x === this.x) && (other.y === this.y);
    }
}

module.exports = SnakBody;