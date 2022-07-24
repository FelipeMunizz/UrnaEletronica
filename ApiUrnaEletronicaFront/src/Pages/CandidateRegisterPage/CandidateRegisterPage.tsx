import React, { useCallback, useEffect } from 'react';
import CandidateList from './Components/CandidateList';
import CandidateRegisterForm from './Components/CandidateRegisterForm';
import ErrorResponse from '../../ErrorResponse';
import ICandidate from '../../Models/Interfaces/ICandidate';
import CandidateService from '../../Services/CandidateService';


export default function CandidateRegisterPage() {
  document.title = "Candidatos";
  
  const [allCandidates, setAllCandidates] = React.useState<ICandidate[]>([]);

  const refreshCandidateList = useCallback(async () => {
    const { getCandidates } = new CandidateService();

    const candidates = await getCandidates();

    if (candidates instanceof ErrorResponse) {
      return alert(candidates.ErrorMessage);
    }

    setAllCandidates(candidates as ICandidate[]);
  }, [])

  
  useEffect(() => { (async () => { await refreshCandidateList() })(); }, [refreshCandidateList])

  return (
    <main>
      <CandidateRegisterForm refreshCandidateList={refreshCandidateList} />
      <hr className="" />
      <CandidateList refreshCandidateList={refreshCandidateList} allCandidates={ allCandidates } />
    </main>
  );
}
