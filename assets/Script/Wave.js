cc.Class({
    extends: cc.Component,
	
    properties: {},
	onLoad: function () {},
	
	// use this for initialization
	init: function (waveSize, prefabEnemy,startingPosition,path,startingTimeInSeconds) {
		// size of the wave
		this.waveSize = waveSize;
		// path of the wave
		this.path = path;
		// starting position of the wave
		this.startingPosition = startingPosition;
		// starting time of the wave
		this.startingTimeInSeconds = startingTimeInSeconds
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
		// check of the enemyPool is instantiated
		if (this.enemyPool.size() > 0) 
		{ 		
			for (let i = 0; i < this.waveSize; ++i) {
			// gets an enemy out of the pool
			enemy = this.enemyPool.get();
			// binds the enemy to the parent
			enemy.parent = parentNode;
			// initializes the enemy
			// parameters are hitpoints, number in the wave and path of the wave
			enemy.getComponent('Enemy').init(100,i+1,this.path);
			// sets the starting point of the enemy
			enemy.setPosition(cc.p(this.startingPosition[0],this.startingPosition[1]));
			// starts the movement of the of the enemy
			// first it delays the action with the starting time of the wave
			// then it runs the movement of the enemy
			enemy.runAction(cc.sequence(new cc.DelayTime(this.startingTimeInSeconds),enemy.getComponent('Enemy').move()));
			}
		}	
	},
});
