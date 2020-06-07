import React, { useState, useEffect } from 'react';
import {Link, Redirect} from 'react-router-dom';

import API from '../../api';
import './style.css';

function Login() {
	const [user, setUser] = useState('');
	const [password, setPassword] = useState('');
	const [login, setLogin] = useState(false);
	document.title = "Instapets";

	async function handleSubmit(e){
		e.preventDefault();
		if(!user || !password){
			return false;
		}
		try{
			const r = await API.user.login(user, password);
			
			localStorage.setItem('@petsgram-token', r.data.token);
			localStorage.setItem('@petsgram-user', r.data.user.userName);
			
			setLogin(true);
		}
		catch(err){
			const message = document.querySelector('.login-message');
			message.style.display = 'block';
		}

	}

	useEffect( () => {
		const button = document.querySelector("button");
		if(user && password){
			button.classList.remove('unclickable');
			button.classList.add('clickable');
		}
		else{
			button.classList.remove('clickable');
			button.classList.add('unclickable');
		}
	}, [user, password]);

	if(login){
		return <Redirect to='/'/>
	}

	return (
		<>
			<div className="box-login">
				<div className="login-header">
					<h2>Instapets</h2>
				</div>
				<form onSubmit={handleSubmit}>
					<input type="text" name="user" autoComplete="off" placeholder="Digite seu login" value={user} onChange={(e) => setUser(e.currentTarget.value)} />
					<input type="password" name="password" autoComplete="off" placeholder="Digite sua senha" value={password} onChange={(e) => setPassword(e.currentTarget.value)} />
					<button className="unclickable">Entrar</button>
				</form>
				<div className="login-message">
					<span>Usuario ou senha inválidos</span>
				</div>
				<div className="login-footer">
					<Link to="/esqueci-senha">Esqueci minha senha</Link>
				</div>
			</div>

			<div className="box-login-signup">
				<div>
					<span>Não tem uma conta? <Link to="/signup">Cadastre-se</Link></span>
				</div>
			</div>
		</>
	);
}

export default Login;