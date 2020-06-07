import React, {useState, useEffect} from 'react';
import Header from '../Header';
import API from '../../api';
import { Redirect } from 'react-router-dom';
import './style.css';
function Content({children, ...rest}) {
	const userName = localStorage.getItem("@petsgram-user");
	const token = localStorage.getItem("@petsgram-token");
	
	const [logged, setLogged] = useState(true);
	const [user, setUser] = useState(null);

	useEffect(() => {
		( async () => {
			try{
				const r = await API.user.getUser();
				setUser(r.data);
			}
			catch(err){
				console.log(err.response);
				if(err.response.data.tokenError){
					localStorage.removeItem("@petsgram-user");
					localStorage.removeItem("@petsgram-token");
					setLogged(false);
				}
			}
		})();

	}, [userName, token]);

	if(!logged){
		return <Redirect to="/login" />
	}

	if(!user){
		return <></>
	}

	return (
		<div className="container">
			<Header user={user}/>

			<main>
				{children}
			</main>
	
		</div>);

}

export default Content;