cc.Class({
    extends: cc.Component,

    properties: {
		prefabEnemy: cc.Prefab,
		wave:{
			default:null,
			type: cc.Node
		},
		moneyLabel: { 
			default: null,
			type: cc.Label
		},
		backgroundMusic: {
			default: null,
			url: cc.AudioClip
		},
    },

    // use this for initialization
    onLoad: function () {
		this.audio = cc.audioEngine.play(this.backgroundMusic, true, 0.05);
		this.money = 100;
		this.moneyLabel.string = "Money: " + this.money;
		this.path = [415,0,0,-440,470,0,0,255,200,0];
		this.waveCount = 10;
		this.wave.getComponent('Wave').init(this.waveCount, cc.instantiate(this.prefabEnemy), 100, [0], false, [-505,250], this.path, 0);
		this.wave.getComponent('Wave').createWave(this.node);
		/*
		// spawn a wave
		// init method parameters:
		// 1) waveSize: number or enemies in the wave
		// 2) preFab: enemyPrefab object
		// 3) waveSpeed: multiplier for waveSpeed -> < 1 wave speed goes up, > 1 wave goes slower
		// 4) waveType: array of types the the wave contains
		// 5) mixedWave: boolean for wave creation behavior, should be true of length of waveType array is greater then 1, TODO: remove this boolean and make it a local variable
		// 6) startingPosition of wave: where the wave starts spawning
		// 7) path: path which is followed by the wave
		// 8) startingTimeInSeconds: time when the wave starts -> can be replaced with 0 is the wave is summoned by player
		this.wave.getComponent('Wave').init(15, cc.instantiate(this.prefabEnemy), 0.5, [1,0,2], true, [-505,250], this.path, 10);
		this.wave.getComponent('Wave').createWave(this.node);*/
    },
	//gets every enemy on the scene
	getEnemys: function () {
		var enemys = [];
		var children = this.node.children;
		for (let i = 0 ; i < children.length; i++){
			if(children[i].getComponent("Enemy") != undefined)
			{
				enemys.push(children[i]);
			}
		}
		return enemys;
	},
	decreaseMoney: function (money) {
		this.money -= money;
		this.node.getComponent("Level1").updateMoneyLabel();
	},
	increaseMoney: function(money) {
		this.money += money;
		this.node.getComponent("Level1").updateMoneyLabel();
	},
	updateMoneyLabel: function () {
		this.moneyLabel.string = "Money: " + this.money;
	},
	getMoney: function() {
		return this.money;
	},
	spawnWave: function () {
		this.waveCount += 2
		this.wave.getComponent('Wave').init(this.waveCount, cc.instantiate(this.prefabEnemy), 100, [0], false, [-505,250], this.path, 0);
		this.wave.getComponent('Wave').createWave(this.node);
	},
	setTowerDetails: function (tower) {
		var children = this.towerDetails.node.children;
		children[0].getComponent(cc.Label).string = "Level: " + tower.towerLevel
		children[1].getComponent(cc.Label).string = "Damage: " + tower.damage
		children[2].getComponent(cc.Label).string = "Exp: " + tower.experience
		children[3].getComponent(cc.Label).string = "Kills: " + tower.kills
	}
});
