import React, { useState, useEffect } from 'react';
import {Link, Redirect} from 'react-router-dom';

import API from '../../api';
import {BsLock} from 'react-icons/bs';
import './style.css';

function ForgotPass() {
	const [user, setUser] = useState('');
	const [login, setLogin] = useState(false);
	const [sending, setSending] = useState(false);

	document.title = "Instapets";

	async function handleSubmit(e){
		e.preventDefault();
		if(!user){
			return false;
		}
		setSending(true);
		try{
			await API.user.forgotPass(user);
			alert('Email enviado com sucesso!');
			setSending(false);
			setLogin(true);
		}
		catch(err){
			setSending(false);
			const message = document.querySelector('.forgot-message');
			message.style.display = 'block';
			const span = message.childNodes[0];
			span.textContent = err.response.data.msg
		}

	}

	useEffect( () => {
		const button = document.querySelector("button");
		if(user){
			button.classList.remove('unclickable');
			button.classList.add('clickable');
		}
		else{
			button.classList.remove('clickable');
			button.classList.add('unclickable');
		}
	}, [user]);

	if(login){
		return <Redirect to='/login'/>
	}

	return (
		<>
			<div className="box-forgot">
				<div className="forgot-header">
					<h2>Instapets</h2>
				</div>
				<div>
					<div className="forgot-lock">
						<div>
							<BsLock size={50}/>
						</div>
					</div>
					<h4>Problemas para entrar?</h4>
					<p>Insira o nome de usuário e enviaremos um link para você voltar a acessar a sua conta.</p>
				</div>
				<form onSubmit={handleSubmit}>
					<input type="text" name="user" autoComplete="off" placeholder="Digite seu usuário" value={user} onChange={(e) => setUser(e.currentTarget.value)} />
					<button className="unclickable">{sending ? 'Enviando...' : 'Enviar email'} </button>
				</form>
				<div className="forgot-message">
					<span>Usuário inválido</span>
				</div>
			</div>

			<div className="box-forgot-signup">
				<div>
					<span>Não tem uma conta? <Link to="/signup">Cadastre-se</Link></span>
				</div>
			</div>

			<div className="box-forgot-signup">
				<div>
					<span><Link to="/login">Voltar para o login</Link></span>
				</div>
			</div>
		</>
	);
}

export default ForgotPass;