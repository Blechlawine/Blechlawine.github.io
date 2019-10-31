function startStarfield() {
    var starFieldCanvas = document.getElementById("starFieldCanvas");
    if(starFieldCanvas.getContext) {
        var starfield = new Starfield();
        starFieldCanvas.addEventListener("mousemove", function(event) { //doesnt get fired?!?!?!?!??!?!?!?!?!??!?!?!?!?!?!??!?!?!?!?!??!?!?!?!??!?!?!?
            let e = event || window.event;
            // starfield.onMouseMove(e);
            console.log(e.clientX);
            starfield.mouseX = e.clientX;
            starfield.mouseY = e.clientY;
        });
        // starFieldCanvas.onmousemove = function(e) {
        //     starfield.mouseX = e.clientX;
        //     starfield.mouseY = e.clientY;
        // };
        var blah = setInterval(function() {
            starfield.draw();
        }, 33);
    }
}

class Starfield {

    constructor() {
        this.canvas = document.getElementById("starFieldCanvas");
        this.context = this.canvas.getContext("2d");
        this.canvasData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = "#FF0000";
        this.mousePos = [0, 0];
        this.mouseX = 0;
        this.mouseY = 0;
        this.starPositions = [];
        for(var i = 0; i < 200; i++) {
            this.starPositions.push([Math.random(), Math.random(), Math.random()]);
        }
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    maxThisRandom(max, random) {
        return Math.floor(random * Math.floor(max));
    }

    set canvas(value) {
        this._canvas = value;
    }

    get canvas() {
        return this._canvas;
    }

    draw() {
        if(this.canvas) {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.context.fillStyle = "#FFFFFF";
            this.context.strokeStyle = "#FFFFFF";
            this.context.beginPath();
            // console.log(this.mouseX);
            this.context.arc(this.mouseX, this.mouseY, 10, 0, 2 * Math.PI, false);
            this.context.fill();
            for(var i = 0; i < 200; i++) {
                this.context.beginPath();
                let x = this.maxThisRandom(this.canvas.width, this.starPositions[i][0]);
                let y = this.maxThisRandom(this.canvas.height, this.starPositions[i][1]);
                let size = this.maxThisRandom(3, this.starPositions[i][2]);
                this.context.arc(x, y, size, 0, 2 * Math.PI, false);
                this.context.fill();
            }
        }
    }

    onMouseMove(event) {
        let e = event || window.event;
        console.log(e.clientX);
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        // this.mousePos = [mouseX, mouseY];
    }
}
