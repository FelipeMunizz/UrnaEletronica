import React, { useCallback, useEffect, useState } from 'react';
import ErrorResponse from '../../ErrorResponse';
import CandidateService from '../../Services/CandidateService';
import { toast } from 'react-toastify';
import UrnHelper from './Helpers/UrnHelper';
import VoteScreen from './Components/VoteScreen';
import ICandidate from '../../Models/Interfaces/ICandidate';

import './Styles/urn.css';
import SoundHelper from './Helpers/SoundHelper';


export default function Urn() {
  document.title = "Urna";
  
  const [selectedCandidate, setSelectedCandidate] = useState<ICandidate>();

  const [firstDigit, setFirstDigit] = useState<number>();
  const [secondDigit, setSecondDigit] = useState<number>();
  const [electoralNumber, setElectoralNumber] = useState<number>(0);
  const [indexDigit, setIndexDigit] = useState<number>(0);
  
  const [isEndScreen, setIsEndScreen] = useState<boolean>(false);
  const [isVoteNull, setIsVoteNull] = useState<boolean>(false);

  const pressDigit = async (pressedDigit: number) => {
    if (indexDigit === 0) {
      setFirstDigit(pressedDigit);
    } else if (indexDigit === 1) {
      setSecondDigit(pressedDigit);
    }

    setIndexDigit(indexDigit + 1);
  };

  const eraseAll = () => {
    setFirstDigit(undefined);
    setSecondDigit(undefined);
    setSelectedCandidate(undefined);
    setIsVoteNull(false);
    setIsEndScreen(false);
    setElectoralNumber(0);
    setIndexDigit(0);
  };

  const fetchSelectedCandidate = useCallback(async () => {
    const { getCandidateByElectoralNumber } = new CandidateService();
    
    const candidate = await getCandidateByElectoralNumber(electoralNumber);

    if (candidate instanceof ErrorResponse) {
      setIsVoteNull(true);
      return;
    }

    setSelectedCandidate(candidate as ICandidate);
  }, [electoralNumber]);

  const submitVote = async () => {
    if (isEndScreen) {
      eraseAll();
      return;
    }

    if (isVoteNull) {
      eraseAll()
      setIsEndScreen(true);
      SoundHelper.PlayVoteSound();
      return toast.success('Voto nulo registrado!');
    }

    if (!UrnHelper.IsVoteValid(electoralNumber)) {
      return toast.error('Número de eleitor inválido');
    }

    const { voteCandidate } = new CandidateService();

    const response = await voteCandidate(electoralNumber);

    if (response instanceof ErrorResponse) {
      return toast.error(response.ErrorMessage);
    }

    toast.success('Voto registrado com sucesso!');
    eraseAll();
    setIsEndScreen(true);
    SoundHelper.PlayVoteSound();
  };

  const submitWhiteVote = async () => {
    if (isEndScreen) {
      eraseAll();
      return;
    }

    if (electoralNumber || electoralNumber === 0) {
      return toast.error(
        'Para votar branco, o número de votação deve estar vazio.'
      );
    }

    toast.success('Voto branco registrado!');
    eraseAll();
    setIsEndScreen(true);
    SoundHelper.PlayVoteSound();

  };
  
  useEffect(() => {
    setElectoralNumber(UrnHelper.ParseDigits(firstDigit, secondDigit));
    if (UrnHelper.IsVoteValid(electoralNumber)) {
      fetchSelectedCandidate();
    }
  }, [electoralNumber, fetchSelectedCandidate, firstDigit, secondDigit]);

  return (
    <>
      <div className='urn'>
        <div className='vote-display'>
          <div className='screen'>
            <VoteScreen
              firstDigit={firstDigit}
              secondDigit={secondDigit}
              selectedCandidate={selectedCandidate}
              isVoteNull={isVoteNull}
              isEndScreen={isEndScreen}
            />
          </div>
        </div>
        <div className='keyboard-area'>
          <div className='keyboard-numbers'>
            {UrnHelper.NumpadDigits.map((digit: number) => (
              <button
                className='keyboard-digit'
                key={digit}
                onClick={() => {
                  pressDigit(digit);
                }}
              >
                {digit}
              </button>
            ))}
          </div>
          <div className='action-btns'>
            <button className='white-btn' onClick={submitWhiteVote}>
              Branco
            </button>
            <button className='erase-btn' onClick={eraseAll}>
              Corrige
            </button>
            <button className='confirm-btn' onClick={submitVote}>
              Confirma
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
