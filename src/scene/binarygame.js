var systemLogText;

var SceneBinaryGame = new Phaser.Class({

	Extends: Phaser.Scene,

	initialize:

	function SceneBinaryGame ()
	{
		Phaser.Scene.call(this, { key: 'sceneBinaryGame' });
	},

	preload: function ()
	{
		this.load.image('bg_gameA', 'assets/bg_gameA.png');
		this.load.image('button0', 'assets/button0.png');
		this.load.image('button1', 'assets/button1.png');
		this.load.image('buttonClear', 'assets/button_clear.png');
		this.load.image('buttonSend', 'assets/button_send.png');
	},

	create: function ()
	{

		//Setting Update Timer
	    var timer = this.time.addEvent({
		    delay: 500,                // ms
		    callback: this.updateSystemLog,
		    //args: [],
		    callbackScope: this,
		    loop: true
		});

		var bbg_gameAgg = this.add.image(0, 0, 'bg_gameA').setOrigin(0).setScale(0.711);
		
		if (localStorage.getItem("inputVal") == null){
			inputVal = "> ";	//first played, init
		}else{
			var inputVal = localStorage.getItem("inputVal");
		}

		var btnExit = this.add.rectangle(1280, 55, 20, 20, 0xff0000, 0.5);
		var btn0 = this.add.image(650, 250, 'button0').setScale(0.5);
		var btn1 = this.add.image(750, 250, 'button1').setScale(0.5);
		var btnC = this.add.image(1150, 700, 'buttonClear').setScale(0.3);
		var btnS = this.add.image(1200, 700, 'buttonSend').setScale(0.3);

		var text2Send = this.add.text(875, 680, inputVal,{'backgroundColor':'#0f0', 'fontSize': '16px', 'color': '#00f'});
		systemLogText = this.add.text(875, 400, "",{'backgroundColor':'#0f0', 'fontSize': '16px', 'color': '#00f'}).setOrigin(0, 0);

		// event handles
		btnExit.on('pointerdown', function (event) {
			this.scene.transition({ target: 'sceneStoryA1', duration: 0});
		}, this);

		btn0.on('pointerdown', function (event) {
            inputVal += "0";
			text2Send.setText(inputVal);
			localStorage.setItem("inputVal", inputVal);
		}, this);
        btn1.on('pointerdown', function (event) {
			inputVal += "1";
			text2Send.setText(inputVal);
			localStorage.setItem("inputVal", inputVal);
		}, this);
		btnC.on('pointerdown', function (event) {
			inputVal = "> ";
			text2Send.setText(inputVal);
			localStorage.setItem("inputVal", inputVal);
		}, this);
		btnS.on('pointerdown', function (event) {
			if (CalcRemainTime() != 0){
				gtc.add('gameA', CalcRemainTime()*1000, inputVal, function(data){if(data == "> 011"){console.log('success');}else{console.log('fail');}})
			}else{
				gtc.add('gameA',10000, "Transmission failed: connection lost", function(data){})
			}

			inputVal = "> ";
			text2Send.setText(inputVal);
			localStorage.setItem("inputVal", inputVal);
		}, this);
		btnExit.setInteractive({ cursor: 'pointer' });
		btn0.setInteractive({ cursor: 'pointer' });
		btn1.setInteractive({ cursor: 'pointer' });
		btnC.setInteractive({ cursor: 'pointer' });
		btnS.setInteractive({ cursor: 'pointer' });
	},

	updateSystemLog: function ()
	{
		systemLogText.setText("");
		for(obj of gtc.list()){
			var ETA = Math.round((obj.timestamp + obj.delay - new Date().getTime())/1000);
			if(obj.data =="Transmission failed: connection lost"){
				systemLogText.setText(systemLogText.text+obj.data+"\n");
			}else{
				systemLogText.setText(systemLogText.text+obj.data+"\t\tETA: "+ETA+"sec\n");
			}

		}
	}

});
