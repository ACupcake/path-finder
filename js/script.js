const TILE_SIZE = 50;
const BOARD_SIZE = 13;

const FLOOR_IMAGE = new Image();
FLOOR_IMAGE.src = 'images/floor.png';

const WALL_IMAGE = new Image();
WALL_IMAGE.src = 'images/wall.png';

const PLAYER_IMAGE = new Image();
PLAYER_IMAGE.src = 'images/player.png';

const END_IMAGE = new Image();
END_IMAGE.src = 'images/end.png';

const PATH_IMAGE = new Image();
PATH_IMAGE.src = 'images/path.png';

const FLOOR_COLOR = "chocolate";
const WALL_COLOR = "grey";
const PLAYER_COLOR = "blue";
const END_COLOR = "green";
const PATH_COLOR = "yellow";

const FLOOR = "floor";
const WALL = "wall";
const PLAYER = "player";
const END = "end";
const PATH = "path";

let tiles = [];
let listener = null;

class Square {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.color = FLOOR_COLOR;
        this.type = FLOOR;
        this.image = FLOOR_IMAGE;
    }

    setFloor() {
        this.color = FLOOR_COLOR;
        this.type = FLOOR;
        this.image = FLOOR_IMAGE;
        drawBoard();
    }

    setWall() {
        this.color = WALL_COLOR;
        this.type = WALL;
        this.image = WALL_IMAGE;
        drawBoard();
    }

    setPlayer() {
        this.color = PLAYER_COLOR;
        this.type = PLAYER;
        this.image = PLAYER_IMAGE
        drawBoard();
    }

    setEnd() {
        this.color = END_COLOR;
        this.type = END;
        drawBoard();
    }

    setPath() {
        this.color = PATH_COLOR;
        this.type = PATH;
        this.image = PATH_IMAGE
        drawBoard();
    }
}

function drawBoard() {
    let cx = document.querySelector("canvas").getContext("2d");

    for (let tile of tiles) {
        // if (tile.type === END) {
            cx.fillStyle = tile.color;
            cx.fillRect(tile.x, tile.y, TILE_SIZE, TILE_SIZE);
        // } else {
            // cx.drawImage(tile.image, tile.x, tile.y, TILE_SIZE, TILE_SIZE);
        // }
    }
}

function makeBoard() {
    let tiles = [];

    for (y = 0; y < BOARD_SIZE; y += 1) {
        for (x = 0; x < BOARD_SIZE; x += 1) {
            tiles.push(new Square(x + (TILE_SIZE * x), y + (TILE_SIZE * y)))
        }
    }

    return tiles;
}

let listenerSelectTile = function selectTile(event) {
    for (let tile of tiles) {
        if (tile.x <= event.x && tile.x + TILE_SIZE >= event.x) {
            if (tile.y <= event.y && tile.y + TILE_SIZE >= event.y) {
                func(tile);
            }
        }
    }
}

function listenClick() {
    let canvas = document.getElementById('canvas');
    canvas.addEventListener('click', (e) => listenerSelectTile(e))
}

function setPlayer(tile) {
    for (let currTile of tiles) {
        if (currTile.color === PLAYER_COLOR) {
            currTile.setFloor();
        }
    }
    tile.setPlayer();
}

function setBoard(tile) {
    if (tile.type === WALL)
        tile.setFloor();
    else
        tile.setWall();
}

function setEnd(tile) {
    for (let currTile of tiles) {
        if (currTile.color === END_COLOR) {
            currTile.setFloor();
        }
    }
    tile.setEnd();
}

function selectTile(type) {
    removeEventListener("click", (e) => listenerSelectTile(e));

    func = () => null;

    if (type === "player") {
        func = (tile) => setPlayer(tile);
    } else if (type === "board") {
        func = (tile) => setBoard(tile);
    } else if (type === "end") {
        func = (tile) => setEnd(tile);
    }

    listener = listenClick(func);
}

function isEndSet() {
    return tiles.some((tile) => tile.type === END);
}

function isPlayerSet() {
    return tiles.some((tile) => tile.type === PLAYER);
}

function getPlayerPos() {
    return tiles.findIndex((tile) => tile.type === END);
}

function getEndPos() {
    return tiles.findIndex((tile) => tile.type === PLAYER);
}

function rowMin(n) {
    return (Math.floor(n / BOARD_SIZE) * BOARD_SIZE);
}

function rowMax(n) {
    return ((Math.floor(n / BOARD_SIZE) + 1) * BOARD_SIZE) - 1;
}

function solve(endPos, visited, queue) {
    let newQueue = [];

    while (queue.length > 0 && !visited.has(endPos)) {
        position = queue.shift();

        if (position+1 <= rowMax(position) &&
            !visited.has(position+1) &&
            !(tiles[position+1].type === WALL)
        ) {
            visited.set(position + 1, position);
            newQueue.push(position + 1);
        }

        if (visited.has(endPos)) {
            return [visited.get(endPos)];
        }

        if (position-1 >= rowMin(position) &&
            !visited.has(position-1) &&
            !(tiles[position-1].type === WALL)
        ) {
            visited.set(position - 1, position);
            newQueue.push(position - 1);
        }

        if (visited.has(endPos)) {
            return [visited.get(endPos)];
        }

        if (position + BOARD_SIZE < tiles.length &&
            !visited.has(position+BOARD_SIZE) &&
            !(tiles[position+BOARD_SIZE].type === WALL)
        ) {
            visited.set(position + BOARD_SIZE, position);
            newQueue.push(position + BOARD_SIZE);
        }

        if (visited.has(endPos)) {
            return [visited.get(endPos)];
        }

        if (position - BOARD_SIZE >= 0 &&
            !visited.has(position-BOARD_SIZE) &&
            !(tiles[position-BOARD_SIZE].type === WALL)
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

    let result = solve(endPos, visited, newQueue);

    if (result.length === 0) return result;

    return [visited.get(result[0])].concat(result);
}

function cleanPath() {
    for (let tile of tiles) {
        if (tile.type === PATH) {
            tile.setFloor();
        }
    }
}

function drawPath(path, playerPos, endPos) {
    let a = 1;

    for (let index of path) {
        if (index !== playerPos && index !== endPos) {
            setTimeout(() => tiles[index].setPath(), 50*a);
        }
        a = a + 1;
    }
}

function findPath() {
    cleanPath();

    //FIXME: click while solving path changes the end
    //FIXME: click position when changing board position

    if (!isPlayerSet()) {
        console.log("Player is not set");
    } else if (!isEndSet()) {
        console.log("End is not set");
    } else {
        let playerPos = getPlayerPos();
        let endPos = getEndPos();
        let path = solve(endPos, new Map(), [playerPos]);
        path = path.reverse();
        console.log(path)
        if (path.length > 0)
            drawPath(path, playerPos, endPos);
        else
            console.log("cant find path")
    }
}

function main() {
    tiles = makeBoard();
    drawBoard();
}

main();
