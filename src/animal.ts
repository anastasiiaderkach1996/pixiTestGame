import { Graphics } from 'pixi.js';
import { MainHero } from './mainHero';
import { Yard } from './yard';
import { GameFieldHeight, GameFieldWidth } from './constants';

export class Animal extends Graphics {
    speed: number = 2;
    following: boolean = false;
    patrolTarget: { x: number, y: number } | null = null;
    followIndex: number = 0;

    constructor(x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
        this.circle(0, 0, 5);
        this.fill(0xffffff);
        this.setPatrolTarget();
    }

    update(delta: number, mainHero: MainHero, yard: Yard, heroInYard: boolean, followingAnimals: Animal[]): void {
        if (this.following) {
            this.followMainHero(delta, mainHero, followingAnimals);
        } else {
            this.patrol(delta);
        }
    
        if (heroInYard && this.isInsideYard(yard)) {
            this.following = false; 
            this.setPatrolTarget(); 
        }
    }

    followMainHero(delta: number, mainHero: MainHero, followingAnimals: Animal[]): void {
        const angleStep = (2 * Math.PI) / followingAnimals.length;
        const radius = 30;
        const angle = angleStep * this.followIndex;
        
        const targetX = mainHero.x + Math.cos(angle) * radius;
        const targetY = mainHero.y + Math.sin(angle) * radius;

        const dx = targetX - this.x;
        const dy = targetY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 1) {
            this.x += (dx / dist) * this.speed * delta;
            this.y += (dy / dist) * this.speed * delta;
        }
    }

    canFollow(mainHero: MainHero): boolean {
        const dx = mainHero.x - this.x;
        const dy = mainHero.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < 50;
    }

    patrol(delta: number): void {
        if (!this.patrolTarget) {
            this.setPatrolTarget();
        }

        const dx = this.patrolTarget!.x - this.x;
        const dy = this.patrolTarget!.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 5) {
            this.x += (dx / distance) * this.speed * delta;
            this.y += (dy / distance) * this.speed * delta;
        } else {
            this.setPatrolTarget();
        }
    }

    setPatrolTarget(): void {
        this.patrolTarget = {
            x: Math.random() * GameFieldWidth, 
            y: Math.random() * GameFieldHeight
        };
    }

    isInsideYard(yard: Yard): boolean {
        const yardBounds = yard.getBounds();
        const animalBounds = this.getBounds();
    
        return (
            animalBounds.x + animalBounds.width > yardBounds.x &&
            animalBounds.x < yardBounds.x + yardBounds.width &&
            animalBounds.y + animalBounds.height > yardBounds.y &&
            animalBounds.y < yardBounds.y + yardBounds.height
        );
    }
}
