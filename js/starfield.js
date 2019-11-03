/*
A algorithm to draw a starfield onto a canvas with a simple (bad) pathfinder connecting stars close to the mouse with closer stars and eventually with the mouse

Copyright: Marc Zinser 2019
All rights reserved.
*/

function startStarfield() {
    var starFieldCanvas = document.getElementById("starFieldCanvas");
    window.addEventListener("mousemove", function(event) {
        let e = event || window.event;
        starfield.mouseX = e.clientX;
        starfield.mouseY = e.clientY;
    });
    if(starFieldCanvas.getContext) {
        var starfield = new Starfield();
        var blah = setInterval(function() {
            starfield.draw();
        }, 33);
    }
}

class Starfield {

    constructor() {
        this.starAmount = 200;
        this.maxDistanceToMouse = 200;
        this.canvas = document.getElementById("starFieldCanvas");
        this.context = this.canvas.getContext("2d");
        this.canvasData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = "#FF0000";
        this.mousePos = [0, 0];
        this.mouseX = 0;
        this.mouseY = 0;
        this.starPositions = [];
        for(var i = 0; i < this.starAmount; i++) {
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
            let curMouseX = this.mouseX / 1.05 + (0.025 * window.innerWidth);
            let curMouseY = (this.mouseY / 1.05 + (0.025 * window.innerHeight)) + (document.getElementsByClassName("parallax")[0].scrollTop / 2);
            // because scale(2.1) in parallax.css to compensate the size difference in perspective and the offset

            let closeStars = [];

            for(let i = 0; i < this.starAmount; i++) {
                let tempStarX = this.maxThisRandom(this.canvas.width, this.starPositions[i][0]);
                let tempStarY = this.maxThisRandom(this.canvas.height, this.starPositions[i][1]);
                let distance = this.getDistanceBetween([curMouseX, curMouseY], [tempStarX, tempStarY]);
                if(distance <= this.maxDistanceToMouse) {
                    closeStars.push([tempStarX, tempStarY, distance]);
                }
            }

            // console.log(closeStars);
            for(let i = 0; i < closeStars.length; i++) {
                let curDistanceToMouse = closeStars[i][2];
                let bestNext = [curMouseX, curMouseY, this.maxDistanceToMouse];
                for(let j = 0; j < closeStars.length; j++) {
                    let distanceToNext = this.getDistanceBetween(closeStars[i], closeStars[j]);
                    if(distanceToNext <= 125) {
                        let nextDistanceToMouse = this.getDistanceBetween(closeStars[j], [curMouseX, curMouseY]);
                        if(nextDistanceToMouse < curDistanceToMouse && nextDistanceToMouse < bestNext[2]) {
                            bestNext = [closeStars[j][0], closeStars[j][1], nextDistanceToMouse];
                        }
                    }
                }
                this.context.beginPath();
                this.context.moveTo(closeStars[i][0], closeStars[i][1]);
                this.context.lineTo(bestNext[0], bestNext[1]);
                this.context.stroke();
            }

            //IT WORKS!!!!!!!!

            for(var i = 0; i < this.starAmount; i++) {
                this.context.beginPath();
                let x = this.maxThisRandom(this.canvas.width, this.starPositions[i][0]);
                let y = this.maxThisRandom(this.canvas.height, this.starPositions[i][1]);
                let size = this.maxThisRandom(3, this.starPositions[i][2]);
                this.context.arc(x, y, size, 0, 2 * Math.PI, false);
                this.context.fill();
            }
        }
    }

    getDistanceBetween(pos1, pos2) {
        let x1 = pos1[0];
        let y1 = pos1[1];
        let x2 = pos2[0];
        let y2 = pos2[1];

        let diffX = x2 - x1;
        let diffY = y2 - y1;

        let distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
        return distance;
    }
}
