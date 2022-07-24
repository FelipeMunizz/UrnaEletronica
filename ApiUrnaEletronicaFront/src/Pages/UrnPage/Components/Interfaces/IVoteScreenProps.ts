import ICandidate from '../../../../Models/Interfaces/ICandidate';

export default interface IVoteScreenProps {
	selectedCandidate?: ICandidate,
	firstDigit?: number,
	secondDigit?: number,
	isVoteNull?: boolean,
	isEndScreen?: boolean,
}