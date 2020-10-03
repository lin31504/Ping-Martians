var SceneWelcome = new Phaser.Class({

	Extends: Phaser.Scene,

	initialize:

	function SceneWelcome ()
	{
		Phaser.Scene.call(this, { key: 'sceneWelcome' });
	},

	preload: function ()
	{
		this.load.image('logo', 'assets/logo.png');
		this.load.image('button', 'assets/button.png');
	},

	create: function ()
	{
		var logo = this.add.image(700, 350, 'logo');
		this.tweens.add({'targets': logo, 'y': 250, 'duration': 1500});
		var btn = this.add.image(700, 600, 'button');
		btn.setAlpha(0.1)
		this.tweens.add({'targets': btn, 'alpha': 1, 'duration': 2000});
		btn.once('pointerdown', function (event) {
			//this.scene.transition({ target: 'sceneStarmap', duration: 0});
			//this.scene.transition({ target: 'sceneWelcomeVideo', duration: 0});
			this.scene.transition({ target: 'sceneStoryA1', duration: 0});
		}, this);
		btn.setInteractive({ cursor: 'pointer' })
	}

});
