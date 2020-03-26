import React, { useEffect, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api'
import './styles.css'

import logoImg from '../../assets/logo.svg'
import { FiPower, FiTrash2 } from 'react-icons/fi';



export default function Profile(){
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();

    useEffect(() => {
        api.get('profile', {
            headers:{
                Authorization: ongId,
            }
        }).then( res => {
            setIncidents(res.data);
            
        })
    }, [ongId])
    console.log(incidents);

    async function handleDelete(id) {
        try {
            api.delete(`incidents/${id}`, {
                headers:{
                    Authorization: ongId,
                }
            })
            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (error) {
            alert( 'erro ao deletar caso ')
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Logo" />
                <span>Bem vindx, {ongName}</span>
                <Link className="button" to="/incidents/new">Cadastrar novo pedido</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>
            <h1>Favores solicitados</h1>
            <ul>
                {incidents.map( incident => (
                <li key={incident.id}>
                <strong>FAVOR</strong>
                <p>{incident.title}</p>
                <strong>Descrição:</strong>
                <p>{incident.description}</p>
                <strong>Valor</strong>
                <p>{Intl.NumberFormat('pt-br',{style:'currency', currency: 'BRL'}).format(incident.value)}</p>
                <button onClick={() => handleDelete(incident.id) } type="button">
                    <FiTrash2 size={20} color="#a8a8b3"/>
                </button>
            </li>
                ))}
            </ul>
        </div>
    )
}

