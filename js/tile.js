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

class Tile {
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
    }

    setWall() {
        this.color = WALL_COLOR;
        this.type = WALL;
        this.image = WALL_IMAGE;
    }

    setPlayer() {
        this.color = PLAYER_COLOR;
        this.type = PLAYER;
        this.image = PLAYER_IMAGE
    }

    setEnd() {
        this.color = END_COLOR;
        this.type = END;
    }

    setPath() {
        this.color = PATH_COLOR;
        this.type = PATH;
        this.image = PATH_IMAGE
    }
}



export { Tile };
