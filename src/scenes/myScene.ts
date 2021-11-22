import DuckEngine, { Duck } from 'duckengine';
import Enemy from '../objects/enemy';
import MyPlayer from '../objects/player';
import bgTrack from '../../public/bg.mp3';

export default class MyScene extends DuckEngine.Scene {
	public camera!: Duck.TypeClasses.Cameras.Camera;
	public myPlayer!: MyPlayer;
	public myEnemies!: Duck.TypeClasses.Misc.Group<Enemy>;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public enemyInterval!: any;

	public gameOverText!: Duck.TypeClasses.GameObjects.Interactive.Text;

	public backgroundSound!: Duck.TypeClasses.Sound.SoundPlayer;

	constructor(game: Duck.TypeClasses.Game) {
		super('MyScene', game, true);
	}

	public create() {
		// setup
		this.camera = this.add.mainCamera();
		this.myEnemies = this.add.group('Enemies', []);

		// objects
		this.myPlayer = this.add.gameobject.existing(
			new MyPlayer(this.game, this)
		) as MyPlayer;
		this.myPlayer.physics.addCollider(this.myEnemies.group);

		this.gameOverText = this.add.interactive.text('Game Over', {
			x: this.myPlayer.position.x - 100,
			y: this.myPlayer.position.y,
			method: 'draw-stroke',
			styles: {
				fontCSS: '45px arial',
				fillColor: '#000000',
				strokeColor: '#ffffff',
				strokeWidth: 1,
			},
		});
		this.gameOverText.visible = false;

		this.backgroundSound = this.add.soundPlayer(bgTrack, {
			volume: 0.5,
		});
		this.backgroundSound.element.loop = true;

		this.backgroundSound.play();

		this.camera.startFollow(this.myPlayer, 0.1, 0.1);
		// this.camera.setZoom(700);

		// create enemies
		this.createEnemies(10);

		this.enemyInterval = setInterval(() => {
			this.createEnemies(1);
		}, 100);
	}

	public update() {
		this.myPlayer.updateInput();
		this.myPlayer.checkForDeath(this.myEnemies);

		(this.gameOverText.position.x = this.myPlayer.position.x - 100),
			(this.gameOverText.position.y = this.myPlayer.position.y);

		if (!this.myPlayer.alive) {
			// remove all enemies
			this.myEnemies.each((enemy, index) => {
				enemy.visible = false;
				this.myEnemies.splice(index, 1);
				clearInterval(this.enemyInterval);
			});
			this.gameOverText.visible = true;
			this.backgroundSound.pause();
		}
	}

	public createEnemies(amount: number) {
		for (let i = 0; i < amount; i++) {
			this.createEnemy();
		}
	}

	public createEnemy() {
		const x = this.tools.math.randomInt(
			200 - this.myPlayer.position.x,
			200 + this.myPlayer.position.x
		);
		const y = this.tools.math.randomInt(
			200 - this.myPlayer.position.y,
			200 + this.myPlayer.position.y
		);
		const enemy = this.add.gameobject.existing(
			new Enemy(x, y, this.game, this)
		);
		this.myEnemies.add(enemy);
		return enemy;
	}
}
