import Board from "./board.js"

const BOARD = "board";

class Game {
    constructor() {
        this.board = new Board();
        this.add_btn_listener();
        this.boardListener;
        this.listener = () => null;
    }

    add_btn_listener() {
        document.getElementById(BOARD).addEventListener("click", () => this.listenBoardClick(BOARD));
    }

    listenBoardClick(type) {
        // FIXME: Fix event listener not removing 
        removeEventListener("click", this.listener);

        this.listener = (event) => this.catchBoardClick(event, type);

        let canvas = document.getElementById('canvas');
        canvas.addEventListener('click', this.listener);
    }

    catchBoardClick(event, type) {
        console.log("oiogjirgir")
        const tile = this.board.findClickedTile(event);
        if (tile !== null) {
            this.board.setTile(tile, type);
        }
    }
}

let game = new Game();
