import React from 'react';
import { Redirect } from 'react-router-dom';

import NewPost from '../NewPost';
import Feed from '../Feed';
import Footer from '../Footer';

import "./style.css";

function Home() {
	const token = localStorage.getItem('@petsgram-token');
	
	if(!token){
		return (
			<Redirect to='/login' />
		)
	}
	return (
		<>	
			<div className="main-col-1">
				<NewPost />
				<Feed />
			</div>
			
			<div className="main-col-2">
				<Footer />
			</div>
		</>
	);
}

export default Home;