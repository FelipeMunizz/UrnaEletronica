const urnVote = require('../../../Sounds/UrnVote.mp3');

export default class SoundHelper {
	public static PlayVoteSound(): void {
		const audio = new Audio(urnVote);
		audio.play();
	}
}