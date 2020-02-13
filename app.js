class Player {
    constructor(player) {
        this.player = document.getElementById(player);
        this.top = this.player.offsetTop;
    }

    move(keyCode) {
        if (keyCode == 38 && this.top > 0) {
            this.top -= 25;
            this.player.style.top = (this.top) + "px";
        } else if (keyCode == 40 && this.top < 450) {
            this.top += 25;
            this.player.style.top = (this.top) + "px";
        }
        console.log(this.top);
    }

}

const player1 = new Player("player1");
const player2 = new Player("player2");

document.addEventListener('keydown', function (e) {
    player1.move(e.keyCode);
});

/* Moving the ball */
var ball = document.getElementById("ball");
var ballLeft = ball.offsetLeft;
var ballTop = ball.offsetTop;
var dirLeft = "up";
var dirTop = "down";
var animId = null;

function move() {

    // Move the ball in the good direction on the y axis
    if (ballLeft > 1345 && ballLeft < 1353) {
        dirLeft = "down";
    } else if (ballLeft == 0) {
        dirLeft = "up";
    }
    
    if (dirLeft == "up") {
        ballLeft += 4;
    } else if (dirLeft == "down") {
        ballLeft -= 4;
    }

    // Move the ball in the good direction on the x axis
    if (ballTop > 645 && ballTop < 653) {
        dirTop = "up";
    } else if (ballTop == 0) {
        dirTop = "down";
    }

    if (dirTop == "up") {
        ballTop -= 5;
    } else if (dirTop == "down") {
        ballTop += 5;
    }

    ball.style.left = ballLeft + "px";
    ball.style.top = ballTop + "px";
    animId = requestAnimationFrame(move);
}

// Start the animation
animId = requestAnimationFrame(move);