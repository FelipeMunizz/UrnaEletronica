import React from 'react';
import { Pie } from 'react-chartjs-2';
import ICandidate from '../../../Models/Interfaces/ICandidate';
import ICandidateList from '../../../Interfaces/ICandidateListProps';

export default function CandidateResultsPieChart({
  allCandidates,
}: ICandidateList) {
  return (
    <div className='chart'>
      {allCandidates && (
        <Pie
          data={{
            labels: allCandidates.map(
              (candidate: ICandidate, i) =>
                `(${candidate.party}) ${candidate.fullName}`
            ),
            datasets: [
              {
                indexAxis: 'y',
                label: 'Votos',
                backgroundColor: [
                  'rgb(255, 99, 132)',
                  'rgb(54, 162, 235)',
                  'rgb(255, 205, 86)',
                ],
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
                text: 'Os três primeiros colocados',
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
