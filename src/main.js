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
	scene: {
		preload: preload,
		create: create
	}
};

var game = new Phaser.Game(config);

function preload ()
{
	this.load.setBaseURL('http://127.0.0.1:8000');

	this.load.image('logo', 'assets/logo.png');
	this.load.image('button', 'assets/button.png');
}

function create ()
{
	var logo = this.add.image(700, 300, 'logo');
	var btn = this.add.image(700, 600, 'button');
}
