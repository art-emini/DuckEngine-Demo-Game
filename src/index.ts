import DuckEngine, { Duck } from 'duckengine';
import MyScene from './scenes/myScene';
import 'regenerator-runtime/runtime'; // fix parcel

const config: Duck.Types.Game.Config = {
	canvas: Duck.AutoCanvas(),
	scale: {
		width: 1280,
		height: 720,
	},
	defaultScene: 'MyScene',
	roundPixels: true,
	physics: {
		enabled: true,
	},
	debug: false,
	background: '#121212',
	dprScale: true,
	splashScreen: {
		extraDuration: 0,
	},
	focus: true,
};

const game = new DuckEngine.Game(config);

game.scenes.add([new MyScene(game)]);

game.start();
