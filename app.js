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