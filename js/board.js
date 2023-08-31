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
                case "player":
                    this.setPlayer(tile);
                    break;
                case "board":
                    this.setBoard(tile);
                    break;
                case "end":
                    this.setEnd(tile);
                    break;
                case "path":
                    this.findPath();
                    break;
                default:
                    console.log("Tile type not found!")
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

    rowMin(n) {
        return (Math.floor(n / BOARD_SIZE) * BOARD_SIZE);
    }
    
    rowMax(n) {
        return ((Math.floor(n / BOARD_SIZE) + 1) * BOARD_SIZE) - 1;
    }

    solve(endPos, visited, queue) {
        let newQueue = [];
        let position;

        while (queue.length > 0 && !visited.has(endPos)) {
            position = queue.shift();
    
            if (position + 1 <= this.rowMax(position) &&
                !visited.has(position + 1) &&
                !(this.tiles[position + 1].type === WALL)
            ) {
                visited.set(position + 1, position);
                newQueue.push(position + 1);
            }
    
            if (visited.has(endPos)) {
                return [visited.get(endPos)];
            }
    
            if (position - 1 >= this.rowMin(position) &&
                !visited.has(position - 1) &&
                !(this.tiles[position - 1].type === WALL)
            ) {
                visited.set(position - 1, position);
                newQueue.push(position - 1);
            }
    
            if (visited.has(endPos)) {
                return [visited.get(endPos)];
            }
    
            if (position + BOARD_SIZE < this.tiles.length &&
                !visited.has(position+BOARD_SIZE) &&
                !(this.tiles[position+BOARD_SIZE].type === WALL)
            ) {
                visited.set(position + BOARD_SIZE, position);
                newQueue.push(position + BOARD_SIZE);
            }
    
            if (visited.has(endPos)) {
                return [visited.get(endPos)];
            }
    
            if (position - BOARD_SIZE >= 0 &&
                !visited.has(position-BOARD_SIZE) &&
                !(this.tiles[position-BOARD_SIZE].type === WALL)
            ) {
                visited.set(position - BOARD_SIZE, position);
                newQueue.push(position - BOARD_SIZE);
            }
    
            if (visited.has(endPos)) {
                return [visited.get(endPos)];
            }
        }
    
        if (newQueue.length === 0) {
            return []
        }
    
        let result = this.solve(endPos, visited, newQueue);
    
        if (result.length === 0) return result;
    
        return [visited.get(result[0])].concat(result);
    }

    drawPath(path, playerPos, endPos) {
        let a = 1;

        for (let index of path) {
            if (index !== playerPos && index !== endPos) {
                setTimeout(() => this.tiles[index].setPath(), 50 * a);
                setTimeout(() => this.drawBoard(), 50 * a);
            }
            a = a + 1;
        }
    }

    findPath() {
        this.cleanTileType(PATH);
    
        //FIXME: click while solving path changes the end
        //FIXME: click position when changing board position

        let playerPosision = this.getPosition(PLAYER);
        let endPosision = this.getPosition(END);

        if (playerPosision === - 1) {
            console.log("Player is not set");
        }
        else if (endPosision === - 1) {
            console.log("End is not set");
        } else {
            let path = this.solve(endPosision, new Map(), [playerPosision]);
            if (path.length > 0) {
                this.drawPath(path, playerPosision, endPosision);
            } else {
                console.log("Can't find path!")
            }
        }
    }

    // TODO: find a better place for tile setters
    setPlayer(tile) {
        this.cleanTileType(PLAYER)
        tile.setPlayer();
    }
    setBoard(tile) {
        if (tile.type === WALL) {
            tile.setFloor();
        } else {
            tile.setWall();
        }
    }
    setEnd(tile) {
        this.cleanTileType(END)
        tile.setEnd();
    }
}

export default Board;
