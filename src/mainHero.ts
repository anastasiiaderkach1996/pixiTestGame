import { Graphics } from 'pixi.js';
import { Yard } from './yard';

export class MainHero extends Graphics {
    speed: number = 5;
    targetX: number;
    targetY: number;

    constructor(x: number, y: number) {
        super();
        this.circle(0, 0, 15);
        this.fill(0xff0000);
        this.x = x;
        this.y = y;
        this.targetX = x;
        this.targetY = y;
    }

    moveToPoint(x: number, y: number): void {
        this.targetX = x;
        this.targetY = y;
    }

    update(delta: number): void {
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
    
        if (distance > 1) {
            const moveX = (dx / distance) * this.speed * delta;
            const moveY = (dy / distance) * this.speed * delta;
    
            this.x += moveX;
            this.y += moveY;
        } else {
            this.x = this.targetX;
            this.y = this.targetY;
        }
    } 

    hitTest(yard: Yard): boolean {
        const heroBounds = this.getBounds();
        const yardBounds = yard.getBounds();
        return heroBounds.x >= yardBounds.x && 
               heroBounds.x + heroBounds.width <= yardBounds.x + yardBounds.width &&
               heroBounds.y >= yardBounds.y &&
               heroBounds.y + heroBounds.height <= yardBounds.y + yardBounds.height;
    }
}