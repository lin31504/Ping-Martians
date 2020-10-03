var SceneMachine3 = new Phaser.Class({

	Extends: Phaser.Scene,

	initialize:

	function SceneMachine3 ()
	{
		Phaser.Scene.call(this, { key: 'sceneMachine3' });
	},

	preload: function ()
	{
		// this.load.image('background', 'assets/background.png');
		this.load.image('cross', 'assets/cross.png');

	},

	create: function ()
	{
		var t = this.add.text(700, 500, 'Some info from machine3\nMore info from machine3', {'fontSize': '40px'})
		var btnExit = this.add.image(1200, 100, 'cross');

		btnExit.on('pointerdown', function (event) {
			this.scene.transition({ target: 'sceneStoryA1', duration: 0});
		}, this);
		btnExit.setInteractive({ cursor: 'pointer' })
	}

});
