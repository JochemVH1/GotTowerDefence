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
		backgroundMusic: {
			default: null,
			url: cc.AudioClip
		},
        // defaults, set visually when attaching this script to the Canvas
        title: 'GoT Tower Defence',
		btnStartLabelText: 'Start'
    },

    // use this for initialization
    onLoad: function () {
        this.label.string = this.title;
		this.btnStartLabel.string = this.btnStartLabelText;
		this.music = cc.audioEngine.play(this.backgroundMusic, true, 0.5);
		log(this.node);
    },

    // called every frame
    update: function (dt) {

    },
	
	onDestroy: function () {
		cc.audioEngine.stop(this.music);
	},
	
	startGame: function (){
		var director = cc.director;
		director.loadScene('Level1');
	},
	
	

});

//debugging purpose
var log = function(node) {
	console.log(node);
}