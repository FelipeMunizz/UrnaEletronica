
import ApiEndpoints from '../ApiEndpoints';
import ErrorResponse from '../ErrorResponse';
import IErrorResponse from '../Interfaces/IErrorResponse';
import ICandidate from '../Models/Interfaces/ICandidate';
import ICandidateService from './Interfaces/ICandidateService';

export default class CandidateService implements ICandidateService {
	public async getCandidates(isSorted: boolean = false): Promise<ICandidate[] | IErrorResponse> {
		const response = await fetch(ApiEndpoints.VOTES_ENDPOINT + `${isSorted ? '?isSorted=true' : ''}`);
		
		if (response.status === 401) {
			return new ErrorResponse('Erro interno: não foi possível obter os candidatos');
		}

		const candidates = await response.json();
		
		return candidates;
	}

	public async getCandidateByElectoralNumber(electoralNumber: number): Promise<ICandidate | IErrorResponse> {
		const response = await fetch(ApiEndpoints.CANDIDATES_ENDPOINT + '?electoralNumber=' + electoralNumber);	
		
		if (response.status === 404) { 
			return new ErrorResponse('Candidato não encontrado');
		}

		const candidate = await response.json();
		return candidate;
		
	}

	public async deleteCandidate(candidateId: number): Promise<void | IErrorResponse> {
		const response = await fetch(ApiEndpoints.CANDIDATES_ENDPOINT, {
			method: 'DELETE',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(candidateId)
		});

		if (response.status === 404) {
			return new ErrorResponse('Candidato não encontrado');
		}
	}

	public async addCandidate(candidate: ICandidate): Promise<void | IErrorResponse> {
		const response = await fetch(ApiEndpoints.CANDIDATES_ENDPOINT, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(candidate)
		});

		if (response.status === 401) {
			return new ErrorResponse('O candidato com esse número de votação já existe');
		} else if (response.status === 400) {
			return new ErrorResponse('Insira um valor válido de 2 dígitos para o número de votação');

		}
	}

	public async voteCandidate(electoralNumber?: number): Promise<void | IErrorResponse> {
		const response = await fetch(ApiEndpoints.VOTES_ENDPOINT, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(electoralNumber)
		});
		
		if (response.status === 404) {
			return new ErrorResponse('Insira um número de um eleitor existente');	
		}

	}
}