import React from 'react';
import '../styles/pages/lading.css'
import logoImg from '../images/Logo.svg'
import { FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom';

const Lading: React.FC = () => {
  return (
    <div className="App" id="page-lading">
      <div className="content-wrapper">
        <img src={logoImg} alt="Happy"/>
        

        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia
             de muitas crianças.</p>
        </main>

        <div className="location">
          <strong>Petrolina</strong>
          <span>Pernanbuco</span>
        </div>

        <Link to="/app" className="enter-app">
          <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)"/>
        </Link>


      </div>
    </div>
  )
}

export default Lading;