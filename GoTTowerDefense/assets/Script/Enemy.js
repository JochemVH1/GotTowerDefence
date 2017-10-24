cc.Class({
    extends: cc.Component,

    properties: {},
    onLoad: function () {},
	
	// use this for initialization
	init: function (hitpoints,speed,numberInWave,path,wave){
		// number of hitpoints
		this.hitpoints = hitpoints;
		// speed
		this.speed = speed;
		// number in the wave
		this.numberInWave = numberInWave
		// path the enemy walks
		this.path = path;
		
		this.wave = wave;
		
		this.isMovingOverX = 0;
		this.isMovingOverY = 0;
		
		this.currentX = this.node.x;
		
		this.currentY = this.node.y;
		
		var collider = this.node.addComponent(cc.CircleCollider);
		collider.radius = 24;
	},
	
	// this function creates the movement sequence based on the path of the level
	move: function(){
		// delaytime for starting the action based on a constant and its number in the wave
		let wait = new cc.DelayTime(1 * this.numberInWave + Math.random());
		// initializing empty array which will contain the movement of the enemy
		var temp = [];
		// adding the delayTime to first position of the array
		temp[0] = wait;
		// since the path array contains a couple of x and y values
		// this loop steps by 2 points

		for (var i = 0; i < this.path.length*2; i +=2)
		{
			//first iteration i = 0 so 0 / 2 + 1 will result in index 1 of the array
			//this because index 0 is already taken by the waiting time
			//move by will be initialized with a duration over 3 seconds
			//second parameter will contain path[0] and path[1] in the cc.p method
			//second iteration i = 2 so 2 / 2 + 1 will result in index 2 of the array
			//move by will be initialized with a duration over 3 seconds
			//second parameter will contain path[2] and path[3] in the cc.p method
			//and so on
			if(this.path[i+1] == 0){
				temp[(i/2)+1] = new cc.MoveBy(Math.abs(this.path[i])/this.speed,cc.p(this.path[i],this.path[i+1]));
			}
			if(this.path[i] == 0){
				temp[(i/2)+1] = new cc.MoveBy(Math.abs(this.path[i+1])/this.speed,cc.p(this.path[i],this.path[i+1]));
			}
				

			//I'm also thinking about adding a speed variable to the initialisation process of the enemy
			//this can be devided with the duration of the moveBy method so we can give different enemys different speeds
		}
		return cc.sequence(temp);
	},
	animate: function(animation,namePlist,speed){
		cc.loader.loadRes(namePlist, cc.SpriteAtlas, function(err, atlas){
			var aniframes = atlas.getSpriteFrames();
			var clip =  cc.AnimationClip.createWithSpriteFrames(aniframes,3)
			clip.name = "circle_anim";
			clip.speed = speed;
			clip.wrapMode = cc.WrapMode.Loop;
			animation.addClip(clip);
			animation.play("circle_anim",2);
			animation.setCurrentTime(10, "circle_anim")				
		});
	},
	
	update: function (dt) {
		if(this.currentY != this.node.y || this.currentX != this.node.x)
		{
			if(this.currentY == this.node.y){
				this.isMovingOverX = 1;
				this.isMovingOverY = 0;
			}
			if(this.currentX == this.node.x){
				this.isMovingOverX = 0;
				this.isMovingOverY = 1;
			}
			this.currentY = this.node.y;
			this.currentX = this.node.x;
		}

    },
	onCollisionEnter: function (other, self) {
		if(this.hitpoints <= 0)
		{
			this.wave.enemyKilled(self.node,other.node);
		}
			
	}
});
