import { Application, FederatedPointerEvent, Ticker } from 'pixi.js';
import { MainHero } from './mainHero';
import { Animal } from './animal';
import { Yard } from './yard';
import { Score } from './score';
import { GameField } from './gameField';

export class Game {
    app: Application;
    gameField!: GameField;
    mainHero!: MainHero;
    animals: Animal[] = [];
    yard!: Yard;
    score!: Score;
    spawnInterval: number = 3000; 

    constructor() {
        this.app = new Application();
        this.init();
    }

    async init(): Promise<void> {
        await this.app.init({
            width: 800,
            height: 600,
            backgroundColor: 0x00ff00,
        });

        document.body.appendChild(this.app.canvas);

        this.initializeGame();
    }

    initializeGame(): void {
        this.gameField = new GameField(this.app.screen.width, this.app.screen.height);
        this.mainHero = new MainHero(this.app.screen.width / 2, this.app.screen.height / 2);
        this.yard = new Yard(50, 50, 100, 100);
        this.score = new Score(10, 10);

        this.app.stage.addChild(this.gameField);
        this.app.stage.addChild(this.mainHero);
        this.app.stage.addChild(this.yard);
        this.app.stage.addChild(this.score.text);

        this.app.ticker.add((delta: Ticker) => this.update(delta));
        this.gameField.on('pointerdown', this.onPointerDown.bind(this));

        this.startSpawningAnimals();
    }

    spawnAnimals(): void {
        const animal = new Animal(
            Math.random() * this.app.screen.width,
            Math.random() * this.app.screen.height
        );
        this.animals.push(animal);
        this.app.stage.addChild(animal);
    }

    startSpawningAnimals(): void {
        setInterval(() => {
            this.spawnAnimals();
        }, this.spawnInterval);
    }

    update(delta: Ticker): void {
        this.mainHero.update(delta.deltaTime);
        const followingAnimals = this.animals.filter(animal => animal.following);

        if (followingAnimals.length < 5) {
            const animal = this.animals.find(animal => animal.canFollow(this.mainHero));
            if (animal) {
                animal.following = true;
            }
        }

        const heroInYard = this.mainHero.isInsideYard(this.yard);
        this.animals.forEach(animal => {
            animal.update(delta.deltaTime, this.mainHero, this.yard, heroInYard, followingAnimals);
            if (heroInYard && animal.isInsideYard(this.yard)) {
                this.score.increase();
                this.app.stage.removeChild(animal);
                this.animals = this.animals.filter(a => a !== animal);
            }
        });
    }

    onPointerDown(event: FederatedPointerEvent): void {
        const position = event.global;
        this.mainHero.moveToPoint(position.x, position.y);
    }
}
