class Player {
    constructor(player) {
        this.player = document.getElementById(player);
        this.top = this.player.offsetTop;
        this.score = 0;
    }

    move(keyCode) {
        if (keyCode == 38 && this.top > 0) {
            this.top -= 36;
            this.player.style.top = (this.top) + "px";
        } else if (keyCode == 40 && this.top < 500) {
            this.top += 36;
            this.player.style.top = (this.top) + "px";
        }
    }

}

class Ball {
    constructor() {
        this.ball = document.getElementById("ball");
        this.left = this.ball.offsetLeft;
        this.top = this.ball.offsetTop;
    }
}

const player1 = new Player("player1");
const player2 = new Player("player2");
const ball = new Ball();

document.addEventListener('keydown', function (e) {
    player1.move(e.keyCode);
});

/* Moving the ball */
var dirLeft = "up";
var dirTop = "down";
var animId = null;

function move() {

    // Move the ball in the good direction on the y axis
    if (ball.left > 1365 && ball.left < 1373) {
        dirLeft = "down";
        player1.score++;
        document.getElementById("scoreP1").textContent = player1.score;
    } else if (ball.left == 0) {
        dirLeft = "up";
        player2.score++;
        document.getElementById("scoreP2").textContent = player2.score;
    } else if (ball.left > 25 && ball.left < 48 && ball.top >= (player1.top - 40) && ball.top <= (player1.top + 200)) {
        dirLeft = "up";
    }
    
    if (dirLeft == "up") {
        ball.left += 10;
    } else if (dirLeft == "down") {
        ball.left -= 10;
    }

    // Move the ball in the good direction on the x axis
    if (ball.top > 665 && ball.top < 673) {
        dirTop = "up";
    } else if (ball.top == 0) {
        dirTop = "down";
    }

    if (dirTop == "up") {
        ball.top -= 10;
    } else if (dirTop == "down") {
        ball.top += 10;
    }

    ball.ball.style.left = ball.left + "px";
    ball.ball.style.top = ball.top + "px";
    animId = requestAnimationFrame(move);
}

// Start the animation
animId = requestAnimationFrame(move);