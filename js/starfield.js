function startStarfield() {
    var starFieldCanvas = document.getElementById("starFieldCanvas");
    if(starFieldCanvas.getContext) {
        var starfield = new Starfield(starFieldCanvas);
        starfield.canvas.addEventListener("mousemove", starfield.onMouseMove);
        var blah = setInterval(function() {
            starfield.draw();
        }, 33);
    }
}

class Starfield {

    constructor(canvasIn) {
        this.canvas = document.getElementById("starFieldCanvas");
        this.context = this.canvas.getContext("2d");
        this.canvasData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = "#FF0000";
        this.stars = [];
        this.mousePos = (0, 0);
        for(var i = 0; i < 200; i++) {
            this.stars.push(new Star(this.getRandomInt(this.canvas.width), this.getRandomInt(this.canvas.height), this.getRandomInt(30)));
        }
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    set canvas(value) {
        this._canvas = value;
    }

    get canvas() {
        return this._canvas;
    }

    draw() {
        console.log(this.canvas);
        if(this.canvas) {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.context.fillStyle = "#FF0000";
            this.context.strokeStyle = "#FF0000";
            for(var star in this.stars) {
                this.context.beginPath();
                this.context.arc(star.x, star.y, star.size, 0, 2 * Math.PI, false);
                this.context.fill();
            }
            this.context.beginPath();
            this.context.lineTo(this.mousePos[0], this.mousePos[1]);
            this.context.stroke();
        }
    }

    onMouseMove(event) {
        var mouseX = event.clientX;
        var mouseY = event.clientY;
        this.mousePos = [mouseX, mouseY];
    }
}

class Star {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }
}
