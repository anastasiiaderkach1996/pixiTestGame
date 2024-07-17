import { Graphics } from 'pixi.js';

export class GameField extends Graphics {
    constructor(width: number, height: number) {
        super();
        this.rect(0, 0, width, height);
        this.fill(0x00ff00);
        this.width = width;
        this.height = height;
        this.interactive = true;
    }
}