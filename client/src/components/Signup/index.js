import React, { useState, useEffect } from 'react';
import {Link, Redirect} from 'react-router-dom';

import API from '../../api';
import './style.css';

function Signup() {
	const [user, setUser] = useState('');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');


	const [login, setLogin] = useState(false);
	const [sending, setSending] = useState(false);

	document.title = "Instapets";

	async function handleSubmit(e){
		e.preventDefault();
		if(!user || !password || !name || !email){
			return false;
		}
		setSending(true);
		try{
			const r = await API.user.signup(name, user, email, password);
			localStorage.setItem('@petsgram-token', r.data.token);
			localStorage.setItem("@petsgram-user", r.data.user.userName);
			setSending(false);
			setLogin(true);
		}
		catch(err){
			setSending(false);
			const message = document.querySelector('.signup-message');
			message.style.display = 'block';
			const span = message.childNodes[0];
			span.textContent = err.response.data.msg
		}

	}

	useEffect( () => {
		const button = document.querySelector("button");
		if(user && email && name && password){
			button.classList.remove('unclickable');
			button.classList.add('clickable');
		}
		else{
			button.classList.remove('clickable');
			button.classList.add('unclickable');
		}
	}, [user, email, name, password]);

	if(login){
		return <Redirect to='/'/>
	}

	return (
		<>
			<div className="box-signup">
				<div className="signup-header">
					<h2>Instapets</h2>
				</div>
				<div>
					<p>Cadastre-se para ver fotos dos seus amigos.</p>
				</div>
				<form onSubmit={handleSubmit}>
					<input type="text" name="email" autoComplete="off" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
					<input type="text" name="user" autoComplete="off" placeholder="Digite seu usuário" value={user} onChange={(e) => setUser(e.currentTarget.value)} />
					<input type="text" name="name" autoComplete="off" placeholder="Digite seu nome completo" value={name} onChange={(e) => setName(e.currentTarget.value)} />
					<input type="password" name="password" autoComplete="off" placeholder="Digite sua senha" value={password} onChange={(e) => setPassword(e.currentTarget.value)} />
					
					<button className="unclickable">{sending ? 'Enviando...' : 'Cadastrar'} </button>
				</form>
				<div className="signup-message">
					<span>Usuário inválido</span>
				</div>
			</div>

			<div className="box-signup-signup">
				<div>
					<span>Já tem uma conta? <Link to="/login">Conecte-se</Link></span>
				</div>
			</div>
		</>
	);
}

export default Signup;