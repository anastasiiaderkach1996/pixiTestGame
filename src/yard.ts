import { Graphics } from 'pixi.js';

export class Yard extends Graphics {
    constructor(x: number, y: number, width: number, height: number) {
        super();
        this.rect(x, y, width, height);
        this.fill(0xffff00);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}
