import React from 'react';
import { Bar } from 'react-chartjs-2';
import ICandidate from '../../../Models/Interfaces/ICandidate';
import ICandidateList from '../../../Interfaces/ICandidateListProps';

export default function CandidateResultsBarChart({
  allCandidates,
}: ICandidateList) {
  return (
    <div className='chart'>
      {allCandidates && (
        <Bar
          data={{
            labels: allCandidates.map(
              (candidate: ICandidate, i) =>
                `(${candidate.party}) ${candidate.fullName}`
            ),
            datasets: [
              {
                indexAxis: 'y',
                label: 'Votos',
                backgroundColor: '#4F86A9',
                data: allCandidates.map(
                  (candidate: ICandidate) => candidate.voteCount
                ),
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: 'Resultados de todos os candidatos',
                padding: {
                  top: 10,
                  bottom: 30,
                },
              },
            },
          }}
        />
      )}
    </div>
  );
}
