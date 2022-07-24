import IErrorResponse from '../../Interfaces/IErrorResponse';
import ICandidate from '../../Models/Interfaces/ICandidate';

interface ICandidateService {
	getCandidates(): Promise<ICandidate[] | IErrorResponse>;
	getCandidateByElectoralNumber(electoralNumber: number): Promise<ICandidate | IErrorResponse>;
	addCandidate(candidate: ICandidate): Promise<void | IErrorResponse>;
	deleteCandidate(candidateId: number): Promise<void | IErrorResponse>;
	voteCandidate(electoralNumber: number): Promise<void | IErrorResponse>;
}

export default ICandidateService;