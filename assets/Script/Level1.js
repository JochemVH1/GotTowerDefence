cc.Class({
    extends: cc.Component,

    properties: {
		prefabEnemy: cc.Prefab,
		wave:{
			default:null,
			type: cc.Node
		},
    },

    // use this for initialization
    onLoad: function () {
		this.path = [375,0,0,-440,470,0,0,255,200,0];
		this.wave.getComponent('Wave').init(10, cc.instantiate(this.prefabEnemy), 1, 0, [-450,250], this.path, 0);
		this.wave.getComponent('Wave').createWave(this.node);		
		this.wave.getComponent('Wave').init(15, cc.instantiate(this.prefabEnemy), 0.5, 1, [-450,250], this.path, 10);
		this.wave.getComponent('Wave').createWave(this.node);
    },
});
