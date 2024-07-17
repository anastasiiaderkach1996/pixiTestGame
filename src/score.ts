import { Text, TextStyle } from 'pixi.js';

export class Score {
    value: number;
    text: Text;

    constructor(x: number, y: number) {
        this.value = 0;
        const style = new TextStyle({
            fill: 0xffffff,
            fontSize: 24,
        });

        this.text = new Text({ text: `Score: ${this.value}`, style });
        this.text.x = x;
        this.text.y = y;
    }

    increase(): void {
        this.value += 1;
        this.text.text = `Score: ${this.value}`;
    }
}
