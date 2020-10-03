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
		this.load.image('mb_app', 'assets/mb_app.png');
		this.load.image('ob_app', 'assets/ob_app.png');
		this.load.image('laptop', 'assets/laptop.png');
		this.load.image('cactus', 'assets/cactus.png');
		this.load.image('ad1', 'assets/screen_logo_1.png');
		this.load.image('ad2', 'assets/screen_logo_2.png');
		this.load.image('fg_StoryA1', 'assets/fg_storyA1_effect.png');
	},

	create: function ()
	{
		var bg_StoryA1 = this.add.image(0, 0, 'bg_StoryA1').setOrigin(0).setScale(0.711);
		var fsapp = this.add.image(440, 410, 'fs_app').setScale(0.7);
		var mbapp = this.add.image(620, 410, 'mb_app').setScale(0.7);
		var obapp = this.add.image(800, 410, 'ob_app').setScale(0.7);
		var machine2 = this.add.image(350, 670, 'laptop').setScale(0.7);
		var machine3 = this.add.image(1230, 640, 'cactus').setScale(0.7);
		var ads = [];
		ads.push(this.add.image(180, 330, 'ad1').setScale(0.7));
		ads.push(this.add.image(180, 330, 'ad2').setScale(0.7));
		ads[1].alpha = 0;
		var fg_StoryA1 = this.add.image(0, 0, 'fg_StoryA1').setOrigin(0).setScale(0.711);

		fsapp.on('pointerdown', function (event) {
			this.scene.transition({ target: 'sceneBinaryGame', duration: 0});
		}, this);
		machine2.on('pointerdown', function (event) {
			this.scene.transition({ target: 'sceneMachine2', duration: 0});
		}, this);
		machine3.on('pointerdown', function (event) {
			this.scene.transition({ target: 'sceneMachine3', duration: 0});
		}, this);
		obapp.on('pointerdown', function (event) {
			this.scene.transition({ target: 'sceneStarmap', duration: 0});
		}, this);
		fsapp.setInteractive({ cursor: 'pointer' })
		machine2.setInteractive({ cursor: 'pointer' })
		machine3.setInteractive({ cursor: 'pointer' })
		obapp.setInteractive({ cursor: 'pointer' })
	}
});
