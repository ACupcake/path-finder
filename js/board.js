import { Tile } from "./tile.js"
import {WALL, PLAYER, END, PATH} from "./types.js"

const TILE_SIZE = 50;
const BOARD_SIZE = 13;


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
        if (tile !== null) {
            switch (type) {
                case "path":
                    this.findPath();
                    break;
                default:
                    tile.setType(type);
            }
            this.drawBoard();
        }
    }

    cleanTileType(type) {
        for (let tile of this.tiles) {
            if (tile.type === type) {
                tile.setFloor();
            }
        }
    }

    getPosition(type) {
        return this.tiles.findIndex((tile) => tile.type === type);
    }

    minimumRow(n) {
        return (Math.floor(n / BOARD_SIZE) * BOARD_SIZE);
    }

    maximumRow(n) {
        return ((Math.floor(n / BOARD_SIZE) + 1) * BOARD_SIZE) - 1;
    }

    solve(endPosition, visited, queue) {
        let newQueue = [];
        let position;

        while (queue.length > 0 && !visited.has(endPosition)) {
            position = queue.shift();

            if (position + 1 <= this.maximumRow(position) &&
                !visited.has(position + 1) &&
                !(this.tiles[position + 1].type === WALL)
            ) {
                visited.set(position + 1, position);
                newQueue.push(position + 1);
            }
    
            if (position - 1 >= this.minimumRow(position) &&
                !visited.has(position - 1) &&
                !(this.tiles[position - 1].type === WALL)
            ) {
                visited.set(position - 1, position);
                newQueue.push(position - 1);
            }
    
            if (position + BOARD_SIZE < this.tiles.length &&
                !visited.has(position + BOARD_SIZE) &&
                !(this.tiles[position + BOARD_SIZE].type === WALL)
            ) {
                visited.set(position + BOARD_SIZE, position);
                newQueue.push(position + BOARD_SIZE);
            }
    
            if (position - BOARD_SIZE >= 0 &&
                !visited.has(position - BOARD_SIZE) &&
                !(this.tiles[position - BOARD_SIZE].type === WALL)
            ) {
                visited.set(position - BOARD_SIZE, position);
                newQueue.push(position - BOARD_SIZE);
            }
    
            if (visited.has(endPosition)) {
                return [visited.get(endPosition)];
            }
        }
    
        if (newQueue.length === 0) {
            return []
        }
    
        let result = this.solve(endPosition, visited, newQueue);
    
        if (result.length === 0) return result;
    
        return [visited.get(result[0])].concat(result);
    }

    drawPath(path, playerPosition, endPosition) {
        path.forEach((index, timer) => {
            if (index !== playerPosition && index !== endPosition) {
                setTimeout(() => this.tiles[index].setPath(), 50 * timer);
                setTimeout(() => this.drawBoard(), 50 * timer);
            }
        });
    }

    findPath() {
        this.cleanTileType(PATH);
    
        //FIXME: click while solving path changes the end
        //FIXME: click position when changing board position

        const playerPositionision = this.getPosition(PLAYER);
        const endPositionision = this.getPosition(END);

        if (playerPositionision === - 1) {
            console.log("Player is not set");
        } else if (endPositionision === - 1) {
            console.log("End is not set");
        } else {
            const path = this.solve(endPositionision, new Map(), [playerPositionision]);
            if (path.length > 0) {
                this.drawPath(path, playerPositionision, endPositionision);
            } else {
                console.log("Can't find path!")
            }
        }
    }
}

export default Board;
