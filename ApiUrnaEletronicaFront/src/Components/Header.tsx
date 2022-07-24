import React from 'react';
import { Link } from 'react-router-dom';

import './Styles/header.css';

export default function Header() {
  return (
    <header>
      <nav>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to='/' className="nav-text">Votar</Link>
          </li>
          <li className="nav-item">
            <Link to='/register' className="nav-text">Candidatos</Link>
          </li>
          <li className="nav-item">
            <Link to='/dashboard' className="nav-text">Resultados</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
