import { color } from '../config';
import { Cylinder } from '../effect/cylinder';

export class Wall {
    constructor(sence, time) {
        this.time = time;
        this.sence  = sence;
        this.config = {
            radius: 50,
            height: 50,
            open: true,
            color: color.wall,
            opacity: 0.6,
            position: {
                x: 0,
                y: 0,
                z: 0
            },
            speed: 1.0
        }
        this.wall = new Cylinder(this.sence, this.time);
        this.wall.createCylinder(this.config)
    }
    remove() {
        this.wall.remove();
    }
}