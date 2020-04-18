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

const player1 = new Player(15,canvas.height/2-250/2);
const player2 = new Player(canvas.width-35,canvas.height/2-250/2);

// Init the Ball
var Ball = {
    x: 50,
    y: 50,
    rad: 15,
    horizontal: "increase",
    vertical: "increase",
    speedX: 4,
    speedY: 4,

    draw: function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.rad, 0, 2*Math.PI);
        ctx.closePath();
        ctx.fill();
    },

    // TODO: refactor this function
    move: function() {
        // Choose the direction of the ball on the x axis
        if (Ball.x >= (canvas.width-Ball.rad)) {
            Ball.horizontal = "decrease";
        } else if (Ball.y >= player2.y && Ball.y <= player2.y + player2.height && Ball.x >= player2.x - Ball.rad && Ball.horizontal != "decrease") {
            Ball.horizontal = "decrease";
        } else if (Ball.y >= player1.y && Ball.y <= player1.y + player1.height && Ball.x <= (player1.x + player1.width) + Ball.rad && Ball.horizontal != "increase") {
            Ball.horizontal = "increase";
        } else if (Ball.x <= (0+Ball.rad)) {
            Ball.horizontal = "increase";
        }
    
        // Choose the direction of the ball on the y axis
        if (Ball.y >= (canvas.height-Ball.rad)) {
            Ball.vertical = "decrease";
            Ball.speedY = Math.round(Math.random()*(13-2)+2);
        } else if (Ball.y <= (0+Ball.rad)) {
            Ball.vertical = "increase";
            Ball.speedY = Math.round(Math.random()*(13-2)+2);
        }
    
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawLine(10);
        player1.draw();
        player2.draw();
        player2.move(Ball.y);
        
        // Move the ball on the x axis
        if (Ball.horizontal == "increase") {
            Ball.x += Ball.speedX;
        } else if (Ball.horizontal == "decrease") {
            Ball.x -= Ball.speedX;
        }
    
        // Move the ball on the y axis
        if (Ball.vertical == "increase") {
            Ball.y += Ball.speedY;
        } else if (Ball.vertical == "decrease") {
            Ball.y -= Ball.speedY;
        }
    
        Ball.draw();
        window.requestAnimationFrame(Ball.move);
    }
}

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
window.requestAnimationFrame(Ball.move);