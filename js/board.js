import { Tile } from "./tile.js"

const TILE_SIZE = 50;
const BOARD_SIZE = 13;

const PLAYER_COLOR = "blue";
const END_COLOR = "green";

const WALL = "wall";


class Board {
    constructor() {
        this.tiles = []
        this.makeBoard();
        this.drawBoard();
    }

    drawBoard() {
        let cx = document.querySelector("canvas").getContext("2d");
    
        for (let tile of this.tiles) {
            cx.fillStyle = tile.color;
            cx.fillRect(tile.x, tile.y, TILE_SIZE, TILE_SIZE);
        }
    }

    makeBoard() {
        let tiles = [];
    
        for (let y = 0; y < BOARD_SIZE; y += 1) {
            for (let x = 0; x < BOARD_SIZE; x += 1) {
                tiles.push(new Tile(x + (TILE_SIZE * x), y + (TILE_SIZE * y)))
            }
        }
    
        this.tiles = tiles;
    }

    findClickedTile(event) {
        for (let tile of this.tiles) {
            if (tile.x <= event.x && tile.x + TILE_SIZE >= event.x) {
                if (tile.y <= event.y && tile.y + TILE_SIZE >= event.y) {
                    return tile;
                }
            }
        }
    }

    setTile(tile, type) {
        if (type === "player") {
            this.setPlayer(tile);
        } else if (type === "board") {
            this.setBoard(tile);
        } else if (type === "end") {
            this.setEnd(tile);
        }
        this.drawBoard()
    }

    // TODO: find better place for sets
    setPlayer(tile) {
        for (let currTile of tiles) {
            if (currTile.color === PLAYER_COLOR) {
                currTile.setFloor();
            }
        }
        tile.setPlayer();
    }

    setBoard(tile) {
        if (tile.type === WALL)
            tile.setFloor();
        else
            tile.setWall();
    }

    setEnd(tile) {
        for (let currTile of tiles) {
            if (currTile.color === END_COLOR) {
                currTile.setFloor();
            }
        }
        tile.setEnd();
    }
}

export default Board;
