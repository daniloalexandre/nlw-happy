import '../styles/pages/landing.css'

import { FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import React from 'react';
import logo from '../images/logo.svg'

function Landing() {

return (<div id="page-landing">
<div className="content-wrapper">
  <img src={logo} alt="Happy"/>
  <main>
    <h1>Leve Felicidade Para o Mundo</h1>
    <p>Visite orfanatos e mude o dia de muitas crianças.</p>
  </main>
  <div className="location">
    <strong>Campina Grande</strong>
    <span>Paraíba</span>
  </div>
  <Link to="/app" className="enter-app">
    <FiArrowRight size={26} color="rgba(0,0,0,0.6)"/>
  </Link>
</div>
</div>)
}

export default Landing;