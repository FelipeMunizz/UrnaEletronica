import React from 'react';
import IVoteScreenProps from './Interfaces/IVoteScreenProps';

export default function VoteScreen({
  selectedCandidate,
  firstDigit,
  secondDigit,
  isVoteNull,
  isEndScreen,
}: IVoteScreenProps) {
  return (
    <>
      {isEndScreen ? (
        <div className={'end-screen'}>
          <span className="end-label">FIM</span>
          <p className="restart-message">Pressione "confirmar" para reiniciar a votação.</p>
        </div>
      ) : (
        <>
          <h4 className={selectedCandidate ? ' show' : ' hide'}>
            SEU VOTO PARA
          </h4>
          <h2 className='mayor-title'>PRESIDENTE(A)</h2>
          <div className='electoral-number'>
            <span className='urn-data after-selected'>Número:</span>
            <div className='slots'>
              <div className='digit-slot'>
                <span>{firstDigit}</span>
              </div>
              <div className='digit-slot'>
                <span>{secondDigit}</span>
              </div>
            </div>
          </div>
          <div>
            <div className={selectedCandidate ? ' show' : ' hide'}>
              <div className='candidate-data'>
                <span>Nome: {selectedCandidate?.fullName}</span>
              </div>
              <div className='candidate-data'>
                <span>
                  Vice-Prefeito: {selectedCandidate?.viceCandidateName}
                </span>
              </div>
              <div className='candidate-data'>
                <span>Partido: {selectedCandidate?.party}</span>
              </div>
            </div>
            <div className={isVoteNull ? ' show' : ' hide'}>
              <h2>Voto Nulo</h2>
            </div>
          </div>
        </>
      )}
    </>
  );
}
