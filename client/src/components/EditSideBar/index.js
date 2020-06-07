import React from 'react';

// import { Container } from './styles';
import './style.css';
import { Link } from 'react-router-dom';

function EditSideBar() {
	return(
		<div className="edit-sidebar">
			<ul>
				<li>
					<Link to="/edit/profile">Editar perfil</Link>
				</li>

				<li>
					<Link to="/edit/privacy">Privacidade</Link>
				</li>
			</ul>
		</div>
	);
}

export default EditSideBar;