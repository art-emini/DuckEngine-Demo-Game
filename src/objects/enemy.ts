import { Duck } from 'duckengine';

export default class Enemy extends Duck.Classes.GameObjects.Circle {
	constructor(
		x: number,
		y: number,
		game: Duck.TypeClasses.Game,
		scene: Duck.TypeClasses.Scene
	) {
		super(x, y, scene.tools.math.randomInt(5, 10), '#ff7070', game, scene);

		// setup
		this.physics.addHitbox();
	}
}
