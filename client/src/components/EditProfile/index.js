import React, { useState, useEffect } from 'react';
import API from '../../api';

import './style.css';

function EditProfile() {
	const [user, setUser] = useState(null);

	const [name, setName] = useState('');
	const [username, setUsername] = useState('');
	const [bio, setBio] = useState('');
	const [email, setEmail] = useState('');

	useEffect( () => {
		API.user.getUser().then(r => {
			setUser(r.data);
			setName(r.data.name);
			setUsername(r.data.userName);
			setEmail(r.data.email);
			setBio(r.data.bio);		
		}).catch(err => {
			console.log(err.response)
		});
	}, []);



	function handleChangePhoto(e){
		e.preventDefault();
		const formImage = document.getElementById('formImage');
		const form = new FormData(formImage);
		API.user.changePhoto(form).then(() => {
			API.user.getUser().then(r => {
				setUser(r.data);
			});
		});
	}

	function handleChangeInfo(e){
		e.preventDefault();
		if(!username){
			alert('Preencha o nome de usuario');
			return false;
		}

		if(!email){
			alert('Preencha o email');
			return false;
		}

		API.user.editProfile(username, name, email, bio).then(r => {
			// console.log(r);
			alert('Perfil salvo!');
		}).catch(err => alert(err.response.data.msg));

	}


	if(!user) return <></>;
	
	return (
		<div className="edit-profile">
			<div className="edit-header">
				<div className="edit-header-1-col">
					
					{user.profilePhoto
					? <img alt="profile-link" src={API.image(user.profilePhoto)}/>
					: <div className="noPhoto"></div>
					}
				</div>
				<div className="edit-header-2-col">
					<span>{user.userName}</span>
					<label htmlFor="image">Alterar foto do perfil</label>
					<form id="formImage" encType="multipart/form-data" onSubmit={handleChangePhoto}>
						<input type="file" id="image" name="image" onChange={handleChangePhoto}/>
					</form>
				</div>
			</div>
			<div className="edit-body">
				<div>
					<form onSubmit={handleChangeInfo}>
						<div>
							<div className="edit-header-1-col">
								<label>Nome </label>
							</div>
							<div className="edit-header-2-col">
								<input type="text" value={name} onChange={(e) => setName(e.currentTarget.value)}/>
							</div>
						</div>
						
						<div>
							<div className="edit-header-1-col">

							</div>
							<div className="edit-header-2-col">
								<span>Ajude as pessoas a descobrir sua conta usando o nome pelo qual você é conhecido: seu nome completo, apelido ou nome comercial.
Você pode alterar o seu nome apenas duas vezes a cada 14 dias.</span>
							</div>
						</div>
						
						<div>
							<div className="edit-header-1-col">
								<label>Nome de usuário </label>
							</div>
							<div className="edit-header-2-col">
								<input type="text" value={username} onChange={(e) => setUsername(e.currentTarget.value) }/>
							</div>
						</div>

						<div>
							<div className="edit-header-1-col">
								<label>Biografia </label>
							</div>
							<div className="edit-header-2-col">
								<textarea type="text" value={bio} onChange={(e) => setBio(e.currentTarget.value) }></textarea>
							</div>
						</div>

						<div>
							<div className="edit-header-1-col">
								<label>Email </label>
							</div>
							<div className="edit-header-2-col">
								<input type="text" value={email} onChange={(e) => setEmail(e.currentTarget.value) }/>

							</div>
						</div>
						<div>
							<div className="edit-header-1-col"></div>
							<div className="edit-header-2-col">
								<button>Salvar</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default EditProfile;