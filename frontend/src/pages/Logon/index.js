import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom'; 
import {FiLogIn} from 'react-icons/fi'

import './style.css';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Logon(){
  const [id, setId] = useState('');
  const history = useHistory();

  async function handleLogon(e){
    e.preventDefault();

    try{
      const response = await api.post('sessions', {id});

      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);

      history.push('/profile');
    }catch(err){
        alert('Falha ao logar, verifique seu id e tente novamente!');
    }
  }

  return(
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be the hero"/>
        <form onSubmit={handleLogon}>
          <h1>Faça seu Logon</h1>
          <input type="text" placeholder="Sua ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit">Entrar</button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#e02041"/>
            Ainda não tem cadastro, clique aqui!
          </Link>
        </form>
      </section>
      <img src={heroesImg} alt="Heroes"/>
    </div>
  );
}