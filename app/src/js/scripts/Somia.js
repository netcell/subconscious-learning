var vocabulary = require('./vocabulary');

module.exports = class Somia {
	constructor(sleepTracker) {
		this.tracker = sleepTracker;
		this.playing = false;
		this.themeLoop = new Media(`assets/theme-loop.mp3`);
		this.themeLoop.setVolume(1);
		this.themeLoop.play({
			numberOfLoop: 999
		});
	}
	start() {
		this.playList = [];
		vocabulary.map(word => {
			this.playList.push({
				word : word.en,
				audio : `assets/vocabulary/${word['url-en']}.mp3`
			});
			this.playList.push({
				word : word.en,
				audio : `assets/vocabulary/${word['url-vi']}.mp3`
			});
		})
		this.index = 0;
		this.lastPlayed = Date.now();
		_.shuffle(this.playList);
		this.update();
	}
	update() {
		var audio = this.audio;
		// console.log(this.playing);
		if (this.playing) {
			if (this.tracker.awaken && audio) {
				audio.stop();
				audio.release();
				this.themeLoop.setVolume(1)
			}
		} else {
			if (!this.tracker.awake) {
				if (Date.now() - this.lastPlayed > 3000) {
					this.themeLoop.setVolume(0.5);
					audio && audio.release();
					this.getNextAudio();
					this.audio.play();
					this.playing = true;
					this.lastPlayed = Date.now();
				}
			}
		}
		setTimeout(() => this.update(), 100);
	}
	getNextAudio() {
		var word = this.playList[this.index];
		this.index = this.index + 1;
		if (this.index > this.playList.length - 1) this.index = 0;
		$('#alarm .title').text(word.word)
		this.audio = new Media(word.audio, () => {
			this.playing = false;
		}, (e) => { }, (mediaStatus) => {
			if (mediaStatus == Media.MEDIA_STOPPED)
				this.playing = false
		});
	}
}