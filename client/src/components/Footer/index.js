import React, { useState, useEffect } from 'react';

import API from '../../api';

import "./style.css";
// import { Container } from './styles';

function Footer() {
	const [user, setUser] = useState(null);
	useEffect( () => {
		(async () => {
			const r = await API.user.getUser();
			setUser(r.data);
			console.log(r.data);
		})();

	}, []);

	if(!user){
		return <></>;
	}
	return(
		<footer>
			<div className="footer-header">
				<div className="footer-image">
					{user.profilePhoto
					? <img alt="profile-link" src={API.image(user.profilePhoto)}/>
					: <div className="noPhoto"></div>
					}
				</div>
				<div className="footer-profile">
					<div className="footer-profile-username">
						<span>{user.userName}</span>
					</div>

					<div className="footer-profile-name">
						<span>{user.name}</span>
					</div>
				</div>
			</div>
			<div className="footer-body"></div>

			<div className="footer-footer">
				<span>&copy;2020 created by <a href="http://github.com/eduardozampiere">Eduardo Zampiere</a></span>
			</div>
		</footer>
	);
}

export default Footer;