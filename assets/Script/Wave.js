cc.Class({
    extends: cc.Component,
	
    properties: {},
	onLoad: function () {},
	
	// use this for initialization
	init: function (waveSize, prefabEnemy, speedOfWave, waveType, mixedType, startingPosition, path, startingTimeInSeconds) {
		// size of the wave
		this.waveSize = waveSize;
		// speed of the wave
		this.speedOfWave = speedOfWave;
		// path of the wave
		this.path = path;
		// type of monster in the wave
		this.waveType = waveType;
		// boolean for mixing waves
		this.mixedType = mixedType;
		// starting position of the wave
		this.startingPosition = startingPosition;
		// starting time of the wave
		this.startingTimeInSeconds = startingTimeInSeconds;
		// enemyPool of the wave
		this.enemyPool = new cc.NodePool();
		for (let i = 0; i < waveSize; ++i) {
			let enemy = cc.instantiate(prefabEnemy);
			this.enemyPool.put(enemy); // populate your pool with putInPool method
		}
	},
	//gets an enemy out of the wavePoll and runs its path
	createWave: function (parentNode) {
		let enemy = null;
		// check if the enemyPool is instantiated
		if (this.enemyPool.size() > 0) 
		{ 		
			for (let i = 0; i < this.waveSize; ++i) {
			// gets an enemy out of the pool
			enemy = this.enemyPool.get();
			// binds the enemy to the parent
			enemy.parent = parentNode;
			// initializes the enemy
			// parameters are hitpoints, number in the wave and path of the wave
			enemy.getComponent('Enemy').init(100,this.speedOfWave,i+1,this.path);
			// sets the starting point of the enemy
			enemy.setPosition(cc.p(this.startingPosition[0],this.startingPosition[1]));
			// changes texture of monster according to wavetype
			// TODO: waveType might be better as a STRING
			var type = 0;
			if(this.mixedType){
				type = this.waveType[Math.floor(Math.random()*this.waveType.length)];
			}else
			{
				type = this.waveType[0];
			}
			switch(type){
				case 0: 
					// for cc.loader.loadRes to work images must be placed in a folder called resources
					// images also mustn't provide a suffix like .png, .jpg, ...
					var sprite  = enemy.getComponent(cc.Sprite);//.spriteFrame = new cc.SpriteFrame(texture); 
					cc.loader.loadRes("circle", function(err, data) {
						this.spriteFrame = new cc.SpriteFrame(data);
					}.bind(sprite));
					enemy.getComponent('Enemy').animate(enemy.getComponent(cc.Animation),"circle_plist",3);
					break;
				case 1: 
					var sprite = enemy.getComponent(cc.Sprite);
					cc.loader.loadRes("triangle", function(err, data) {
						this.spriteFrame = new cc.SpriteFrame(data);
					}.bind(sprite));
					enemy.getComponent('Enemy').animate(enemy.getComponent(cc.Animation),"triangle_plist",12);
					break;
				case 2:
					var sprite = enemy.getComponent(cc.Sprite);
					cc.loader.loadRes("plane", function(err, data) {
						this.spriteFrame = new cc.SpriteFrame(data);
					}.bind(sprite));
					break;
			}
			// starts the movement of the of the enemy
			// first it delays the action with the starting time of the wave
			// then it runs the movement of the enemy			
			enemy.runAction(cc.sequence(new cc.DelayTime(this.startingTimeInSeconds),enemy.getComponent('Enemy').move()));
	
			}
		}	
	},
});
