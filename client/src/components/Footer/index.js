import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import API from '../../api';

import "./style.css";
// import { Container } from './styles';

function Footer() {
	const [user, setUser] = useState(null);
	const [sugestions, setSugestions] = useState([]);
	useEffect( () => {
		(async () => {
			const r = await API.user.getUser();
			setUser(r.data);
			
			const s = await API.user.sugestions();
			setSugestions(s.data);
		})();
	}, []);

	function renderSugestions(){
		return sugestions.map(sugestion => {
			return (
				<div key={sugestion.user.userName} className="sugestion">
					<div className="sugestion-image">
						<Link to={`/${sugestion.user.userName}`}>
							{sugestion.user.profilePhoto
							? <img alt="profile-link" src={API.image(sugestion.user.profilePhoto)}/>
							: <div className="noPhoto"></div>
							}
						</Link>
					</div>
					<div className="sugestion-name">
						<Link to={`/${sugestion.user.userName}`}>{sugestion.user.userName}</Link>
					</div>
				</div>
			)
		});
	}

	if(!user){
		return <></>;
	}
	return(
		<footer>
			<div className="footer-header">
				<div className="footer-image">
					<Link to={`/${user.userName}`}>
						{user.profilePhoto
						? <img alt="profile-link" src={API.image(user.profilePhoto)}/>
						: <div className="noPhoto"></div>
						}
					</Link>
				</div>
				<div className="footer-profile">
					<div className="footer-profile-username">
						<Link to={`/${user.userName}`}><span>{user.userName}</span></Link>
					</div>

					<div className="footer-profile-name">
						<span>{user.name}</span>
					</div>
				</div>
			</div>
			<div className="footer-body">
				<h2>Sugestões para você</h2>
				{
					renderSugestions()
				}
			</div>

			<div className="footer-footer">
				<span>&copy;2020 created by <a href="http://github.com/eduardozampiere">Eduardo Zampiere</a></span>
			</div>
		</footer>
	);
}

export default Footer;