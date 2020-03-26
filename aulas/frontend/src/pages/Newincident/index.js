import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api'
import './styles.css'

import logoImg from '../../assets/logo.svg'
import { FiArrowLeft } from 'react-icons/fi';

export default function NewIncident(){
    const [title, setTitle] = useState([]);
    const [description, setDescription] = useState([]);
    const [value, setValue] = useState([]);
    const history = useHistory();
    const ongId = localStorage.getItem('ongId')

    async function handleNewIncident(e){
        e.preventDefault();
        const data ={
            title,
            description,
            value,
        };
        try {
            await api.post('incidents', data, {
                headers: { 
                    Authorization: ongId,
                }
            })
            history.push('/profile')
        } catch (error) {
            alert('Erro ao cadastrar caso')
        }

    }
    return(
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Logo" />
                    <h1>Cadastrar novo favor</h1>
                    <p>Peça aqui seu favor, o que você precisa? Ir ao supermercado, farmácia, banco? Tudo aquilo que você pediria para seu netinho!!!</p>
                        <Link className="back-link" to="/profile">
                            <FiArrowLeft size={16} color='#e02041'/>
                            Voltar para Home
                        </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Seu pedido (Ex: Ir na farmácia)"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        />
                    <textarea 
                        placeholder="Descreva aqui o que você precisa"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        />
                    <input 
                        placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        />
                    <button className="button" type="submit">Cadastrar</button>
                </form>

            </div>
        </div>
    )
}