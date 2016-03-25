function Frames(callback) {
    this.callback = callback;
    this.then = Date.now();
}

Frames.prototype = {
    pause: function() {
        window.cancelAnimationFrame(this.animationFrame);
        this.isRunning = false;
    },

    play: function() {
        if (!this.isRunning) {
            this.then = Date.now();
            this.frame();
            this.isRunning = true;
        }
    },

    frame: function(timestamp) {
        var frame = this.frame.bind(this);
        this.setDelta(timestamp);
        this.callback();
        this.animationFrame = window.requestAnimationFrame(frame);
    },

    setDelta: function(timestamp) {
        this.now = timestamp || Date.now();
        this.delta = (this.now - this.then) / 1000; // seconds since last frame
        this.then = this.now;
    }
};

module.exports = Frames;