cc.Class({
    extends: cc.Component,

    properties: {
		sprite: {
			default: null,
			type: cc.SpriteFrame
		},
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function () {
		var node = new cc.Node('Sprite');
		node.setAnchorPoint(0,0);
		node.setPosition(-500,230);
		var sp = node.addComponent(cc.Sprite);
		sp.spriteFrame = this.sprite;
		node.parent = this.node;
		var move_moveBY_1 = cc.MoveBy.create(3,cc.p(375,0));
		var move_moveBY_2 = cc.MoveBy.create(3,cc.p(0,-440));
		var move_moveBY_3 = cc.MoveBy.create(3,cc.p(470,0));
		var move_moveBY_4 = cc.MoveBy.create(3,cc.p(0,255));
		var move_moveBY_5 = cc.MoveBy.create(2,cc.p(200,0));
		var path = cc.sequence(move_moveBY_1,move_moveBY_2,move_moveBY_3,move_moveBY_4,move_moveBY_5);
		node.runAction(path);

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
