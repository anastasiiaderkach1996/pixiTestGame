import { Graphics, Ticker } from 'pixi.js';
import { MainHero } from './mainHero';
import { Yard } from './yard';

export class Animal extends Graphics {
    speed: number = 5;
    following: boolean = false;
    targetX: number = 0;
    targetY: number = 0;

    constructor(x: number, y: number) {
        super();
        this.circle(0, 0, 10);
        this.fill(0xffffff);
        this.x = x;
        this.y = y;
    }

    update(delta: number, mainHero: MainHero): void {
        if (this.following) {
            const dx = mainHero.x - this.x;
            const dy = mainHero.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > 1) {
                this.x += (dx / distance) * this.speed * delta;
                this.y += (dy / distance) * this.speed * delta;
            }
        }
    }


    hitTest(yard: Yard): boolean {
        const animalBounds = this.getBounds();
        const yardBounds = yard.getBounds();
        return animalBounds.x >= yardBounds.x && 
               animalBounds.x + animalBounds.width <= yardBounds.x + yardBounds.width &&
               animalBounds.y >= yardBounds.y &&
               animalBounds.y + animalBounds.height <= yardBounds.y + yardBounds.height;
    }

    setFollowPosition(index: number, mainHero: MainHero): void {
        const angle = (index / 5) * Math.PI * 2;
        const distance = 30;
        this.x = mainHero.x + Math.cos(angle) * distance;
        this.y = mainHero.y + Math.sin(angle) * distance;
    }


    canFollow(mainHero: MainHero): boolean {
        const dx = mainHero.x - this.x;
        const dy = mainHero.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < 100;
    }
}
