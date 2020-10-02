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
		var video = this.add.video(400, 300, 'space').on('complete', () => {});
		var t = this.add.text(950, 700, 'Some story\nMore Story\nStill Story\nA Long Story\nStory.....\nBoring Story\nCool Story\nIntresting Story', {'fontSize': '40px'})
		video.play(true);
		this.tweens.add({'targets': t, 'y': -500, 'duration': 8000}).on('complete', () => {video.destroy();});
	}

});
