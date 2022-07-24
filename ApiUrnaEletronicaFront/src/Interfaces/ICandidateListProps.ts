import ICandidate from '../Models/Interfaces/ICandidate';

export default interface ICandidateResultsProps {
	allCandidates?: ICandidate[],
	refreshCandidateList?: () => void,
}