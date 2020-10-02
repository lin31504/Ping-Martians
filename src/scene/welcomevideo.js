var SceneWelcomeVideo = new Phaser.Class({

	Extends: Phaser.Scene,

	initialize:

	function SceneWelcome ()
	{
		Phaser.Scene.call(this, { key: 'sceneWelcomeVideo' });
	},

	preload: function ()
	{
		this.load.video('space', 'assets/video/video1.mp4')//.on('complete', () => {console.log('load complate')});
	},

	create: function ()
	{
		video = this.add.video(400, 300, 'space').on('complete', () => {});
		video.play(true);
	}

});
