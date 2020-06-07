import React from 'react';
import { Link } from 'react-router-dom';
import {AiFillHome, AiOutlineHeart} from 'react-icons/ai';
import API from '../../api';
import Search from '../Search';
import './style.css';
function Header(props) {
	const user = props.user;
	return(
		<header>

			<div className="header-logo">
				<h1><Link to="/" >Instapets</Link></h1>
			</div>

			<Search />

			<div className="header-buttons">
				<Link to="/"><AiFillHome size={25} color="#222"/> </Link>
				<button><AiOutlineHeart size={25} color="#222" /> </button>
				<Link to={`/${user.userName}`}>
					{user.profilePhoto
					? <img alt="profile-link" src={API.image(user.profilePhoto)}/>
					: <div className="noPhoto"></div>
					}
				</Link>
			</div>
		</header>
	);
}

export default Header;