var systemLogText;
var transmitTimeText;

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
	},

	create: function ()
	{

		//Setting Update Timer
	    var timer = this.time.addEvent({
		    delay: 200,                // ms
		    callback: this.updateSystemLog,
		    //args: [],
		    callbackScope: this,
		    loop: true
		});

		var bg_gameA = this.add.image(0, 0, 'bg_gameA').setOrigin(0).setScale(0.711);
		
		if (localStorage.getItem("inputVal") == null){
			inputVal = "> ";	//first played, init
		}else{
			var inputVal = localStorage.getItem("inputVal");
		}

		var btnExit = this.add.rectangle(1280, 60, 20, 20, 0xff0000, 0);
		var btn0 = this.add.image(670, 230, 'button0').setScale(0.8);
		var btn1 = this.add.image(770, 230, 'button1').setScale(0.8);
		var btnC = this.add.rectangle(890, 720, 80, 40, 0xff0000, 0);
		var btnS = this.add.rectangle(1210, 720, 80, 40, 0xff0000, 0);

		var text2Send = this.add.text(875, 670, inputVal,{'fontSize': '16px', 'color': '#fff'});
		systemLogText = this.add.text(875, 200, "",{'fontSize': '16px', 'color': '#fff'}).setOrigin(0, 0);
		transmitTimeText = this.add.text(860, 170, "Estimated reply time:",{'fontSize': '12px', 'color': '#fff'}).setOrigin(0, 0);
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
				gtc.add('gameA',10000, "Transmission failed: connection lost\n(Earth out of sight)", function(data){})
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
			if(obj.data =="Transmission failed: connection lost\n(Earth out of sight)"){
				systemLogText.setText(systemLogText.text+obj.data+"\n");
			}else{
				systemLogText.setText(systemLogText.text+obj.data+"\t\tETA: "+ETA+"sec\n");
			}			
		}

		if (CalcRemainTime() != 0){
			transmitTimeText.setText("Estimated reply time: " + Math.floor(CalcRemainTime())+" sec")
		}else{
			transmitTimeText.setText("No Connection")
		}
	}

});
