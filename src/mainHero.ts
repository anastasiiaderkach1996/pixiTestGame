import { Graphics } from 'pixi.js';
import { Yard } from './yard';

export class MainHero extends Graphics {
    speed: number = 5;
    targetX: number;
    targetY: number;

    constructor(x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
        this.targetX = x;
        this.targetY = y;
        this.circle(0, 0, 10); 
        this.fill(0xff0000);
    }

    update(delta: number): void {
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 1) {
            const moveDistance = Math.min(distance, this.speed * delta);
            this.x += (dx / distance) * moveDistance;
            this.y += (dy / distance) * moveDistance;
        }
    }

    moveToPoint(x: number, y: number): void {
        this.targetX = x;
        this.targetY = y;
    }

    isInsideYard(yard: Yard): boolean {
        const heroBounds = this.getBounds();
        const yardBounds = yard.getBounds();
    
        return (
            heroBounds.x + heroBounds.width > yardBounds.x &&
            heroBounds.x < yardBounds.x + yardBounds.width &&
            heroBounds.y + heroBounds.height > yardBounds.y &&
            heroBounds.y < yardBounds.y + yardBounds.height
        );
    }
}
