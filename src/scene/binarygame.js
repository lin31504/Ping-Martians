var SceneBinaryGame = new Phaser.Class({

	Extends: Phaser.Scene,

	initialize:

	function SceneBinaryGame ()
	{
		Phaser.Scene.call(this, { key: 'sceneBinaryGame' });
	},

	preload: function ()
	{
		this.load.image('bg', 'assets/bg_gameA.png');
		this.load.image('button0', 'assets/button0.png');
		this.load.image('button1', 'assets/button1.png');
		this.load.image('buttonClear', 'assets/button_clear.png');
		this.load.image('buttonSend', 'assets/button_send.png');
	},

	create: function ()
	{
		var bg = this.add.image(0, 0, 'bg').setOrigin(0).setScale(0.711);
		if (localStorage.getItem("inputVal") == null){
			inputVal = "> ";	//first played, init
		}
		else{
			var inputVal = localStorage.getItem("inputVal");
		}

		var btn0 = this.add.image(650, 250, 'button0').setScale(0.5);
		var btn1 = this.add.image(750, 250, 'button1').setScale(0.5);
		var btnC = this.add.image(1150, 700, 'buttonClear').setScale(0.3);
		var btnS = this.add.image(1200, 700, 'buttonSend').setScale(0.3);
		var Text2Send = this.add.text(875, 680, inputVal,{'backgroundColor':'#0f0', 'fontSize': '16px', 'color': '#00f'});

		btn0.on('pointerdown', function (event) {
            inputVal += "0";
			Text2Send.setText(inputVal);
			localStorage.setItem("inputVal", inputVal);
		}, this);
        btn1.on('pointerdown', function (event) {
			inputVal += "1";
			Text2Send.setText(inputVal);
			localStorage.setItem("inputVal", inputVal);
		}, this);
		btnC.on('pointerdown', function (event) {
			inputVal = "> ";
			Text2Send.setText(inputVal);
			localStorage.setItem("inputVal", inputVal);
		}, this);
		btnS.on('pointerdown', function (event) {
			sentMSG.push({MSG:inputVal, ETA:2000});
			localStorage.setItem("sentMSG", JSON.stringify(sentMSG));

			inputVal = "> ";
			Text2Send.setText(inputVal);
			localStorage.setItem("inputVal", inputVal);
		}, this);
		btn0.setInteractive({ cursor: 'pointer' })
		btn1.setInteractive({ cursor: 'pointer' })
		btnC.setInteractive({ cursor: 'pointer' })
		btnS.setInteractive({ cursor: 'pointer' })
	}

});
