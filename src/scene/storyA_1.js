var SceneStoryA1 = new Phaser.Class({

	Extends: Phaser.Scene,

	initialize:

	function SceneStoryA1 ()
	{
		Phaser.Scene.call(this, { key: 'sceneStoryA1' });
	},

	preload: function ()
	{
		this.load.image('bg_StoryA1', 'assets/bg_StoryA1.png');
		this.load.image('fs_app', 'assets/fs_app.png');
		this.load.image('laptop', 'assets/laptop.png');
		this.load.image('cactus', 'assets/cactus.png');
	},

	create: function ()
	{
		var bg_StoryA1 = this.add.image(0, 0, 'bg_StoryA1').setOrigin(0).setScale(0.711);
		var feedbackSys = this.add.image(420, 410, 'fs_app').setScale(0.7);
		var machine2 = this.add.image(350, 670, 'laptop').setScale(0.7);
		var machine3 = this.add.image(1230, 640, 'cactus').setScale(0.7);

		feedbackSys.on('pointerdown', function (event) {
           this.scene.transition({ target: 'sceneBinaryGame', duration: 0});
		}, this);
        machine2.on('pointerdown', function (event) {
			this.scene.transition({ target: 'sceneMachine2', duration: 0});
		}, this);
		machine3.on('pointerdown', function (event) {
			this.scene.transition({ target: 'sceneMachine3', duration: 0});
		}, this);
		feedbackSys.setInteractive({ cursor: 'pointer' })
		machine2.setInteractive({ cursor: 'pointer' })
		machine3.setInteractive({ cursor: 'pointer' })
	}

});
