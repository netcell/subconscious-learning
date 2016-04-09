var vocabulary = require('./vocabulary');

module.exports = class Somia {
	constructor(sleepTracker) {
		this.tracker = sleepTracker;
		this.playing = false;
<<<<<<< HEAD
		this.themeLoop = new Media(`assets/theme-loop.mp3`);
		this.themeLoop.setVolume(0.5);
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
=======
	}
	start() {
		this.playList = vocabulary.map(word => {
			this.playList.push({
				word : word.en,
				audio : new Media(`assets/vocabulary/${word['url-en']}`, () => this.playing = false)
			});
			this.playList.push({
				word : word.en,
				audio : new Media(`assets/vocabulary/${word['url-vi']}`, () => this.playing = false)
			});
		})
		this.index = 0;
		this.lastPlayed = Date.now() - 3000;
>>>>>>> sounds + platform
		_.shuffle(this.playList);
		this.update();
	}
	update() {
<<<<<<< HEAD
		var audio = this.audio;
		// console.log(this.playing);
		if (this.playing) {
			if (this.tracker.awaken && audio) {
				audio.stop();
				audio.release();
				this.themeLoop.setVolume(0.5)
			}
		} else {
			if (!this.tracker.awake) {
				if (Date.now() - this.lastPlayed > 3000) {
					this.themeLoop.setVolume(0.2);
					audio && audio.release();
=======
		if (this.playing) {
			if (this.tracker.awake) {
				this.audio.stop();
			}
			return;
		} else {
			if (!this.tracker.awake) {
				if (Date.now() - this.lastPlayed > 2000) {
>>>>>>> sounds + platform
					this.getNextAudio();
					this.audio.play();
					this.playing = true;
					this.lastPlayed = Date.now();
				}
			}
		}
<<<<<<< HEAD
		setTimeout(() => this.update(), 100);
=======
		setTimeout(() => this.update(), 500);
>>>>>>> sounds + platform
	}
	getNextAudio() {
		var word = this.playList[this.index];
		this.index = this.index + 1;
		if (this.index > this.playList.length - 1) this.index = 0;
		$('#alarm .title').text(word.word)
<<<<<<< HEAD
		this.audio = new Media(word.audio, () => {
			this.playing = false;
		}, (e) => { }, (mediaStatus) => {
			if (mediaStatus == Media.MEDIA_STOPPED)
				this.playing = false
		});
=======
		this.audio = word.audio;
>>>>>>> sounds + platform
	}
}