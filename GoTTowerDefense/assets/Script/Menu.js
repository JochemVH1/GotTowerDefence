cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
		musicVolumeLabel: {
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
		musicVolumeSlider:{
			default: null,
			type: cc.Slider
		},
        // defaults, set visually when attaching this script to the Canvas
        title: 'GoT Tower Defence',
		btnStartLabelText: 'Start',
		musicVolumeLabelText: 'Volume: '
    },

    // use this for initialization
    onLoad: function () {
        this.label.string = this.title;
		this.btnStartLabel.string = this.btnStartLabelText;
		this.musicVolumeLabel.string = this.musicVolumeLabelText;
		this.music = cc.audioEngine.play(this.backgroundMusic, true, 0.0);
		cc.audioEngine.setVolume(this.music,this.musicVolumeSlider.progress);
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
	
	musicSliderCallback: function(slider,customEventData){
		cc.audioEngine.setVolume(this.music, slider.progress);
	},
});