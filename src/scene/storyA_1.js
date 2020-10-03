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
	},

	create: function ()
	{
		var bg_StoryA1 = this.add.image(0, 0, 'bg_StoryA1').setOrigin(0).setScale(0.711);
		var feedbackSys = this.add.rectangle(420, 410, 100, 100, 0xff0000, 0.5);
		var machine2 = this.add.rectangle(350, 670, 250, 120, 0xff0000, 0.5);
		var machine3 = this.add.rectangle(1230, 640, 150, 200, 0xff0000, 0.5);

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
