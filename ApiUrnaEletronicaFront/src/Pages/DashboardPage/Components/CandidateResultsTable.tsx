import React from 'react';
import ICandidate from '../../../Models/Interfaces/ICandidate';
import ICandidateList from '../../../Interfaces/ICandidateListProps';

export default function CandidateResultsTable({
  allCandidates,
}: ICandidateList) {
  return (
    <div>
      {allCandidates && allCandidates.length && (
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
                <tr>
                  <td>{candidate.fullName}</td>
                  <td>{candidate.electoralNumber}</td>
                  <td>{candidate.voteCount}</td>
                  <td>{candidate.party}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
