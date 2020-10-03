var SceneStoryA1 = new Phaser.Class({

	Extends: Phaser.Scene,

	initialize:

	function SceneStoryA1 ()
	{
		Phaser.Scene.call(this, { key: 'sceneStoryA1' });
	},

	preload: function ()
	{
		// this.load.image('background', 'assets/background.png');
	},

	create: function ()
	{
		var machine1 = this.add.rectangle(400, 500, 200, 150, 0xff0000, 0.5);
		var machine2 = this.add.rectangle(700, 500, 200, 150, 0xff0000, 0.5);
		var machine3 = this.add.rectangle(1000, 300, 200, 150, 0xff0000, 0.5);

		machine1.on('pointerdown', function (event) {
           this.scene.transition({ target: 'sceneMachine1', duration: 0});
		   console.log("machine1");
		}, this);
        machine2.on('pointerdown', function (event) {
			this.scene.transition({ target: 'sceneMachine2', duration: 0});
			console.log("machine2");
		}, this);
		machine3.on('pointerdown', function (event) {
			this.scene.transition({ target: 'sceneMachine3', duration: 0});
			console.log("machine3");
		}, this);
		machine1.setInteractive({ cursor: 'pointer' })
		machine2.setInteractive({ cursor: 'pointer' })
		machine3.setInteractive({ cursor: 'pointer' })
	}

});
