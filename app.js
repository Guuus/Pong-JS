class Player {
    constructor(player) {
        this.player = document.getElementById(player);
        this.top = this.player.offsetTop;
    }

    move(keyCode) {
        if (keyCode == 38 && this.top > 0) {
            this.top -= 36;
            this.player.style.top = (this.top) + "px";
        } else if (keyCode == 40 && this.top < 500) {
            this.top += 36;
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
var scoreP1 = 0;
var scoreP2 = 0;
document.getElementById("scoreP2").textContent = scoreP2;

function move() {

    // Move the ball in the good direction on the y axis
    if (ballLeft > 1365 && ballLeft < 1373) {
        dirLeft = "down";
        scoreP1++;
        document.getElementById("scoreP1").textContent = scoreP1;
    } else if (ballLeft == 0) {
        dirLeft = "up";
        scoreP2++;
        document.getElementById("scoreP2").textContent = scoreP2;
    } else if (ballLeft > 25 && ballLeft < 48 && ballTop >= (player1.top - 40) && ballTop <= (player1.top + 200)) {
        dirLeft = "up";
    }
    
    if (dirLeft == "up") {
        ballLeft += 10;
    } else if (dirLeft == "down") {
        ballLeft -= 10;
    }

    // Move the ball in the good direction on the x axis
    if (ballTop > 665 && ballTop < 673) {
        dirTop = "up";
    } else if (ballTop == 0) {
        dirTop = "down";
    }

    if (dirTop == "up") {
        ballTop -= 10;
    } else if (dirTop == "down") {
        ballTop += 10;
    }

    console.log(ballLeft)
    ball.style.left = ballLeft + "px";
    ball.style.top = ballTop + "px";
    animId = requestAnimationFrame(move);
}

// Start the animation
animId = requestAnimationFrame(move);