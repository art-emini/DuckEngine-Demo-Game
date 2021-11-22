import { Duck } from 'duckengine';
import Group from 'duckengine/dist/core/group/group';
import Enemy from './enemy';

export default class MyPlayer extends Duck.Classes.GameObjects.Circle {
	public speed: number;
	public input: Duck.TypeClasses.Input.KeyboardInput;

	public dieFunc: Duck.TypeClasses.Base.Once;
	public alive: boolean;

	constructor(game: Duck.TypeClasses.Game, scene: Duck.TypeClasses.Scene) {
		super(
			game.canvas.width / 2,
			game.canvas.height / 2,
			15,
			'#2185d1',
			game,
			scene
		);

		// setup
		this.physics.addHitbox();
		this.physics.setBounds(
			0,
			0,
			this.game.canvas.width,
			this.game.canvas.height
		);

		this.alive = true;

		this.dieFunc = this.scene.once(() => {
			this.alive = false;
			this.visible = false;
		}, false);

		// movement
		this.speed = 450;
		this.input = this.scene.add.input().createKeyboardInput();
		this.input.addKeys([
			{
				keyCode: 87, // w
				descriptor: 'W',
			},
			{
				keyCode: 83, // s
				descriptor: 'S',
			},
			{
				keyCode: 65, // a
				descriptor: 'A',
			},
			{
				keyCode: 68, // d
				descriptor: 'D',
			},
		]);
	}

	// custom method
	public updateInput() {
		// easy way to add movement
		const inputVector = this.scene.tools.math.createVector(0, 0);
		inputVector.x =
			(this.input.inputs.D.state ? 1 : 0) -
			(this.input.inputs.A.state ? 1 : 0);
		inputVector.y =
			(this.input.inputs.S.state ? 1 : 0) -
			(this.input.inputs.W.state ? 1 : 0);

		if (this.alive) {
			this.setVelocityX(this.speed * inputVector.x);
			this.setVelocityY(this.speed * inputVector.y);
		}
	}

	public checkForDeath(group: Group<Enemy>) {
		if (this.isCollidingGroup(group)) {
			this.dieFunc.run();
		}
	}
}
