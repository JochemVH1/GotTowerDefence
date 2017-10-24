cc.Class({
    extends: cc.Component,

    properties: {},

    // use this for initialization
    onLoad: function () {},

	init: function (tower, target) {
		this.tower = tower;
		this.target = target;
		this.currentY = this.node.y;
		this.currentX = this.node.x;
	},
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
	onCollisionEnter: function (other, self) {
		if(other.node == this.target)
		{
			this.target.getComponent("Enemy").hitpoints -= this.tower.damage
			this.tower.bulletHit(self.node);
			this.tower.getComponent("Tower").addExp(10);
			if(this.target.getComponent("Enemy").hitpoints <= 0){
				this.tower.getComponent("Tower").kills += 1;
			}
				
		}
	},
	update: function (dt) {

			if(this.currentY == this.node.y && this.currentX == this.node.x){
				this.tower.bulletHit(this.node);
			}
			this.currentY = this.node.y;
			this.currentX = this.node.x;

    },
	

});
