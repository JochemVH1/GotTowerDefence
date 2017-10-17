cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
		btnStart:{
			default:null,
			type: cc.Button
		},
		btnStartLabel:{
			default:null,
			type: cc.Label
		},
        // defaults, set visually when attaching this script to the Canvas
        title: 'GoT Tower Defence',
		btnStartLabelText: 'Start'
    },

    // use this for initialization
    onLoad: function () {
        this.label.string = this.title;
		this.btnStartLabel.string = this.btnStartLabelText;
		log(this.node);
    },

    // called every frame
    update: function (dt) {

    },
	
	startGame: function (){
		alert('start game clicked');
	},
	
	

});

//debugging purpose
var log = function(node) {
	console.log(node);
}