import {
    FLOOR_IMAGE,
    WALL_IMAGE,
    PLAYER_IMAGE,
    END_IMAGE,
    PATH_IMAGE,
    FLOOR_COLOR,
    WALL_COLOR,
    PLAYER_COLOR,
    END_COLOR,
    PATH_COLOR,
    FLOOR,
    WALL,
    PLAYER,
    END,
    PATH
} from "./types.js"

class Tile {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.color = FLOOR_COLOR;
        this.type = FLOOR;
        this.image = FLOOR_IMAGE;
    }

    setType(type) {
        switch (type) {
            case "player":
                this.setPlayer();
                break;
            case "end":
                this.setEnd();
                break;
            case "board":
                type === WALL ? this.setFloor() : this.setWall();
                break;
            default:
                console.log("Tile type not found!");
        }
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
