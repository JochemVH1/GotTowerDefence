cc.Class({
    extends: cc.Component,

    properties: {
		bullet: cc.Prefab,
		arrowSoundEffect: {
			default: null,
			url: cc.AudioClip
		},
		towerDetails: {
			default: null,
			type: cc.Layout
		}
    },

    // use this for initialization
    onLoad: function () {
		this.isSpawn = false;
		this.range = 200;
		this.damage = 34;
		this.target = null;
		this.targetX = 0;
		this.targetY = 0;
		this.kills = 0;
		this.towerLevel = 1;
		this.towerCost = 50;
		this.fireRate = 1;
		this.upgradeCost = 500;
		this.experience = 0;
		this.isSelected = false;
		this.bulletPool = new cc.NodePool();
		this.bulletPool.put(cc.instantiate(this.bullet));
		this.timeInS = 0;
		this.manager = cc.director.getCollisionManager();
		this.manager.enabled = true;
		/*this.manager.enabledDebugDraw = true;
		this.manager.enabledDrawBoundingBox = true;*/
		this.node.on('mousedown', function (event) {
			//stopts event from bubbling up to its parent
			event.stopPropagation();
			this.parent = this.node.parent;
			this.level = this.node.parent.getComponent("Level1");
			if(!this.isSpawn)
			{
				if(this.level.getMoney() >= this.towerCost) {
					this.level.decreaseMoney(this.towerCost);
					this.isSpawn = true;
					var sprite = event.getCurrentTarget().getComponent(cc.Sprite);
					cc.loader.loadRes("cross", function(err, data) {
						this.spriteFrame = new cc.SpriteFrame(data);	
					}.bind(sprite))
					event.getCurrentTarget().addComponent(cc.CircleCollider);
					event.getCurrentTarget().getComponent(cc.CircleCollider).radius = this.range;
				}
			}
			if(this.isSpawn){
				if(this.level.getMoney() > this.upgradeCost){
					this.level.decreaseMoney(this.upgradeCost);
					this.damage += 15;
					this.fireRate -= 0.1
					this.towerLevel += 1;
					if(this.isSelected) {
						this.setTowerDetails(this.node.getComponent("Tower"));
					}
				}
			}

		}, this);
		this.node.on("mouseenter",function (event) {
			event.stopPropagation();
			if(this.isSpawn)
			{
				this.isSelected = true;
				this.setTowerDetails(this.node.getComponent("Tower"));
				this.towerDetails.node.x = 0 - cc.director.getWinSize().width/2;
				this.towerDetails.node.y = 0 - cc.director.getWinSize().height/2;
				var scale = new cc.ScaleTo(0.2,1);
				this.towerDetails.node.runAction(scale);
				
			}
		},this);
		this.node.on("mouseleave",function (event){
			event.stopPropagation();
			if(this.isSpawn){
				this.isSelected = false;
				var scale = new cc.ScaleTo(0.1,0);
				this.towerDetails.node.runAction(scale);
			}
		},this);		
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
		this.timeInS += dt;
		if(this.bulletPool.size() > 0)
		{
			if(this.timeInS > this.fireRate)
			{
				if(this.target != null)
				{
					this.timeInS = 0;
					var bullet = null;
					bullet = this.bulletPool.get(this.bullet);
					bullet = cc.instantiate(this.bullet);
					bullet.parent = this.node.parent;
					bullet.getComponent("Bullet").init(this, this.target);
					bullet.setPosition(this.node.x, this.node.y);
					var targetComponent = this.target.getComponent("Enemy");
					this.targetX = targetComponent.currentX+(targetComponent.speed*0.1 + targetComponent.node.width/2)*targetComponent.isMovingOverX;
					this.targetY = targetComponent.currentY-(targetComponent.speed*0.1 + targetComponent.node.width/2)*targetComponent.isMovingOverY
					var action = new cc.MoveTo(0.1, cc.p(this.targetX,this.targetY));
					cc.audioEngine.play(this.arrowSoundEffect, false, 1);
					bullet.runAction(action.clone());
				}
			}	
		}
    },
	onCollisionEnter: function (other, self) {
		if(this.target == null && other.getComponent("Enemy") != undefined){
			this.target = other.node;
			this.targetX = 0;
			this.targetY = 0;
		}	
	},
	onCollisionStay: function (other, self) {
		if(this.target == null && other.getComponent("Enemy") != undefined){
			this.target = other.node;
			this.targetX = 0;
			this.targetY = 0;
		}
	},
	onCollisionExit: function (other, self) {
		if(other.node == this.target)
		{
			this.target = null;
			this.targetX = 0;
			this.targetY = 0;
		}
	},
	bulletHit: function (bullet){	
		this.bulletPool.put(bullet);	
	},
	setTowerDetails: function (tower) {
		var children = this.towerDetails.node.children;
		children[0].getComponent(cc.Label).string = "Level: " + tower.towerLevel
		children[1].getComponent(cc.Label).string = "Damage: " + tower.damage
		children[2].getComponent(cc.Label).string = "Exp: " + tower.experience
		children[3].getComponent(cc.Label).string = "Kills: " + tower.kills
	},
	addExp:function (exp) {
		this.experience += exp;
		if(this.isSelected)
		{
			this.setTowerDetails(this.node.getComponent("Tower"));
		}
		
	}
});
