var SceneBinaryGame = new Phaser.Class({

	Extends: Phaser.Scene,

	initialize:

	function SceneBinaryGame ()
	{
		Phaser.Scene.call(this, { key: 'sceneBinaryGame' });
	},

	preload: function ()
	{
		this.load.image('button0', 'assets/button0.png');
		this.load.image('button1', 'assets/button1.png');
	},

	create: function ()
	{
		var inputVal = "> ";
		var btn0 = this.add.image(400, 600, 'button0');
		var btn1 = this.add.image(1000, 600, 'button1');
		var Text2Send = this.add.text(700, 200, inputVal,{'backgroundColor':'#0f0', 'fontSize': '40px', 'color': '#00f'});

		btn0.on('pointerdown', function (event) {
            inputVal += "0";
			Text2Send.setText(inputVal);
			console.log(inputVal);
		}, this);
        btn1.on('pointerdown', function (event) {
			inputVal += "1";
			Text2Send.setText(inputVal);
			console.log(inputVal);			
		}, this);
		btn0.setInteractive({ cursor: 'pointer' })
		btn1.setInteractive({ cursor: 'pointer' })
	}

});
