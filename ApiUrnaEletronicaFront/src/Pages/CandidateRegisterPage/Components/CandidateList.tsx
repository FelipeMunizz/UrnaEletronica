import React from 'react';
import { toast } from 'react-toastify';
import ICandidateListProps from '../../../Components/Interfaces/ICandidateListProps';
import ICandidate from '../../../Models/Interfaces/ICandidate';
import CandidateService from '../../../Services/CandidateService';
import deleteIcon from '../../../Images/Icons/delete_icon.png';

import '../../../Styles/candidate_list.css';

export default function CandidateList({
  allCandidates,
  refreshCandidateList,
}: ICandidateListProps) {
  const removeCandidate = async (candidateId?: number) => {
    if (candidateId) {
      const { deleteCandidate } = new CandidateService();
      await deleteCandidate(candidateId);
      refreshCandidateList();
      toast.warning('Candidato removido.');
    }
  };

  return (
    <div>
      <h2 className='candidate-list-title'>Lista de Candidatos</h2>
      {allCandidates.length ? (
        <table className='candidates-table'>
          <thead>
            <tr>
              <th>Nome completo</th>
              <th>Vice</th>
              <th>Nº de votação</th>
              <th>Partido</th>
            </tr>
          </thead>
          <tbody>
            {allCandidates.map((candidate: ICandidate) => {
              return (
                <tr key={candidate.id}>
                  <td>{candidate.fullName}</td>
                  <td>{candidate.viceCandidateName}</td>
                  <td>{candidate.electoralNumber}</td>
                  <td>{candidate.party}</td>
                  <td>
                    <button
                      className='delete-btn'
                      onClick={() => {
                        removeCandidate(candidate.id);
                      }}
                    >
                      <img alt='Deletar Candidato' src={deleteIcon}></img>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <h2 className='no-candidate-message'>Não há candidatos.</h2>
      )}
    </div>
  );
}
