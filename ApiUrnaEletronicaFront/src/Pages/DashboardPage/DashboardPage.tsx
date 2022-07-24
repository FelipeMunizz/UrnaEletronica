import React, { useCallback, useEffect } from 'react';
import ErrorResponse from '../../ErrorResponse';
import ICandidate from '../../Models/Interfaces/ICandidate';
import CandidateService from '../../Services/CandidateService';
import { Chart as ChartJS, registerables } from 'chart.js';
import CandidateResultsTable from './Components/CandidateResultsTable';
import CandidateResultsBarChart from './Components/CandidateResultsBarChart';
import CandidateResultsPieChart from './Components/CandidateResultsPieChart';
import { Link } from 'react-router-dom';

import './Styles/dashboard.css';
import '../../Styles/candidate_list.css';

ChartJS.register(...registerables);


export default function DashboardPage() {
  document.title = "Dashboard";
  
  const [allCandidates, setAllCandidates] = React.useState<ICandidate[]>([]);

  const refreshCandidateList = useCallback(async () => {
    const { getCandidates } = new CandidateService();
    const candidates = await getCandidates(true);

    if (candidates instanceof ErrorResponse) {
      return alert(candidates.ErrorMessage);
    }

    setAllCandidates(candidates as ICandidate[]);
  }, []);

  useEffect(() => {
    (async () => {
      await refreshCandidateList();
    })();
  }, [refreshCandidateList]);

  return (
    <main>
      {allCandidates && allCandidates.length ? (
        <>
          <h2 className='dashboard-title'>Resultados das eleições</h2>
          <div className='dashboard-area'>
            <div className='charts-area'>
              <CandidateResultsPieChart
                allCandidates={[...allCandidates.slice(0, 3)]}
              />
              <CandidateResultsBarChart allCandidates={allCandidates} />
            </div>
            <h3 className='table-title'>Todos os candidatos</h3>
            <CandidateResultsTable allCandidates={allCandidates} />
          </div>
        </>
      ) : (
        <>
          <h2 className='dashboard-title'>Não há candidatos cadastrados.</h2>
          <h3 className='dashboard-title'><Link to="/register">Crie um na página de cadastro</Link></h3>
        </>
      )}
    </main>
  );
}
