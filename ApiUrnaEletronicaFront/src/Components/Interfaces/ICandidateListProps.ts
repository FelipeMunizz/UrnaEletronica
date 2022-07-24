import ICandidate from '../../Models/Interfaces/ICandidate';

export default interface ICandidateListProps {
	allCandidates: ICandidate[];
	refreshCandidateList(): void;
}