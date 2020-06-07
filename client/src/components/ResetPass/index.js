import React, { useState, useEffect } from 'react';
import {Redirect, useParams} from 'react-router-dom';

import API from '../../api';
import './style.css';

function ResetPass() {
	const [password, setPassword] = useState('');
	const [login, setLogin] = useState(false);
	const [sending, setSending] = useState(false);
	const {token, user} = useParams();
	document.title = "Instapets";

	async function handleSubmit(e){
		e.preventDefault();
		if(!password){
			return false;
		}
		setSending(true);
		try{
			await API.user.changePass(user, token, password);
			alert('Email enviado com sucesso!');
			setSending(false);
			setLogin(true);
		}
		catch(err){
			setSending(false);
			const message = document.querySelector('.change-message');
			message.style.display = 'block';
			const span = message.childNodes[0];
			span.textContent = err.response.data.msg
		}

	}

	useEffect( () => {
		const button = document.querySelector("button");
		if(password){
			button.classList.remove('unclickable');
			button.classList.add('clickable');
		}
		else{
			button.classList.remove('clickable');
			button.classList.add('unclickable');
		}
	}, [password]);

	if(login){
		return <Redirect to='/login'/>
	}

	return (
		<>
			<div className="box-change">
				<div className="change-header">
					<h2>Instapets</h2>
				</div>
				<form onSubmit={handleSubmit}>
					<input type="password" name="user" autoComplete="off" placeholder="Digite sua nova senha" value={password} onChange={(e) => setPassword(e.currentTarget.value)} />
					<button className="unclickable">{sending ? 'Enviando...' : 'Trocar senha'} </button>
				</form>
				<div className="change-message">
					<span>Usuário inválido</span>
				</div>
			</div>
		</>
	);
}

export default ResetPass;