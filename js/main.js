import Board from "./board.js"

const SET_BOARD = "board";
const SET_PLAYER = "player";
const SET_END = "end";
const SET_PATH = "path";

class Game {
    constructor() {
        this.board = new Board();
        this.action = null;
        this.add_listeners();
    }

    add_listeners() {
        const canvas = document.getElementById('canvas');
        canvas.addEventListener('click', (event) => this.catchBoardClick(event, this.action));

        document.getElementById(SET_BOARD).addEventListener("click", () => this.action = SET_BOARD);
        document.getElementById(SET_PLAYER).addEventListener("click", () => this.action = SET_PLAYER);
        document.getElementById(SET_END).addEventListener("click", () => this.action = SET_END);
        document.getElementById(SET_PATH).addEventListener("click", (e) => this.catchBoardClick(e, SET_PATH));
    }

    catchBoardClick(event, type) {
        const tile = this.board.findClickedTile(event);
        this.board.setTile(tile, type);
    }
}

const game = new Game();
