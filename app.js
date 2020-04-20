var canvas = document.getElementById('canvas');
var canvasPos = canvas.getBoundingClientRect();
var ctx = canvas.getContext('2d');
ctx.fillStyle = "#fff";

// Init the Player
class Player {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 200;
    }

    draw() {
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();
    }

    move(targetY) {
        if (targetY < this.height/2) {
            this.y = 0;
        } else if (targetY > canvas.height-this.height/2) {
            this.y = canvas.height-this.height;
        } else {
            this.y = targetY - this.height/2;
        }
    }
}

// Init the Ball
class Ball {
    constructor() {
        this.rad = 15;
        this.x = 50;
        this.y = 50;
        this.dirX = 1;
        this.dirY = 1;
        this.speedX = 4;
        this.speedY = 4;
        window.requestAnimationFrame(()=>this.move);
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.rad, 0, 2*Math.PI);
        ctx.closePath();
        ctx.fill();
    }

    get move() {
        // Choose the direction of the ball on the x axis
        if (this.x >= (canvas.width-this.rad)) {
            this.dirX = -1;
        } else if (this.y >= player2.y && this.y <= player2.y + player2.height && this.x >= player2.x - this.rad && this.dirX != -1) {
            this.dirX = -1;
        } else if (this.y >= player1.y && this.y <= player1.y + player1.height && this.x <= (player1.x + player1.width) + this.rad && this.dirX != 1) {
            this.dirX = 1;
        } else if (this.x <= (0+this.rad)) {
            this.dirX = 1;
        }

        // Choose the direction of the ball on the y axis
        if (this.y >= (canvas.height-this.rad)) {
            this.dirY = -1;
        } else if (this.y <= (0+this.rad)) {
            this.dirY = 1;
        }
    
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawLine(10);
        player1.draw();
        player2.draw();
        player2.move(this.y);
        
        // Move the ball on the x axis
        if (this.dirX == 1) {
            this.x += this.speedX;
        } else if (this.dirX == -1) {
            this.x -= this.speedX;
        }
    
        // Move the ball on the y axis
        if (this.dirY == 1) {
            this.y += this.speedY;
        } else if (this.dirY == -1) {
            this.y -= this.speedY;
        }
    
        this.draw();
        window.requestAnimationFrame(()=>this.move);
    }
}

// Create 2 players and 1 ball
const player1 = new Player(15,canvas.height/2-250/2);
const player2 = new Player(canvas.width-35,canvas.height/2-250/2);
const ball = new Ball();

function drawLine(width) {
    ctx.rect((canvas.width/2)-(width/2), 0, width, canvas.height);
    ctx.fill();
}

canvas.addEventListener('mousemove', e => {
    let mouseY = e.clientY - canvasPos.top;
    player1.move(mouseY);
});

drawLine(10);
player1.draw();
player2.draw();