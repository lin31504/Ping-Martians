var SceneMachine2 = new Phaser.Class({

	Extends: Phaser.Scene,

	initialize:

	function SceneMachine2 ()
	{
		Phaser.Scene.call(this, { key: 'sceneMachine2' });
	},

	preload: function ()
	{
		// this.load.image('background', 'assets/background.png');
		this.load.image('cross', 'assets/cross.png');
	},

	create: function ()
	{
		var t = this.add.text(700, 500, 'Some info from machine2\nMore info from machine2', {'fontSize': '40px'})
		var btnExit = this.add.image(1200, 100, 'cross');

		btnExit.on('pointerdown', function (event) {
			this.scene.transition({ target: 'sceneStoryA1', duration: 0});
		}, this);
		btnExit.setInteractive({ cursor: 'pointer' })
	}

});
