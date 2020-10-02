var SceneWelcome = new Phaser.Class({

	Extends: Phaser.Scene,

	initialize:

	function SceneWelcome ()
	{
		Phaser.Scene.call(this, { key: 'sceneWelcome' });
	},

	preload: function ()
	{
		this.load.setBaseURL('http://127.0.0.1:8000');

		this.load.image('logo', 'assets/logo.png');
		this.load.image('button', 'assets/button.png');
	},

	create: function ()
	{
		var logo = this.add.image(700, 300, 'logo');
		var btn = this.add.image(700, 600, 'button');
		btn.once('pointerdown', function (event) {
			this.scene.transition({ target: 'sceneWelcomeVideo', duration: 0 });
		}, this);
		btn.setInteractive({ cursor: 'pointer' })
	}

});
