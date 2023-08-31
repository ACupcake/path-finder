import Board from "./board.js"
import { PLAYER, END, PATH, BOARD } from "./types.js"


class Game {
    constructor() {
        this.board = new Board();
        this.action = null;
        this.add_listeners();
    }

    add_listeners() {
        const canvas = document.getElementById('canvas');
        canvas.addEventListener('click', (event) => this.catchBoardClick(event, this.action));

        document.getElementById(BOARD).addEventListener("click", () => this.action = BOARD);
        document.getElementById(PLAYER).addEventListener("click", () => this.action = PLAYER);
        document.getElementById(END).addEventListener("click", () => this.action = END);
        document.getElementById(PATH).addEventListener("click", (e) => this.catchBoardClick(e, PATH));
    }

    catchBoardClick(event, type) {
        const tile = this.board.findClickedTile(event);
        this.board.setTile(tile, type);
    }
}

const game = new Game();
