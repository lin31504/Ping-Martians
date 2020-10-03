var config = {
	type: Phaser.AUTO,
	autoCenter: Phaser.Scale.CENTER_BOTH,
	width: 1400,
	height: 700,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 }
		}
	},
	scene: [SceneWelcome, SceneWelcomeVideo, SceneBinaryGame, SceneStarmap]

	//Custum Global DATA
	
};

var game = new Phaser.Game(config);
