import React from 'react';
import {Link} from 'react-router-dom';
import API from '../../api';

import "./style.css";
function GridElement(props) {
	const post = props.post;

	return (
		<div className="grid-element">
			<Link to={`post/${post._id}`} ><img src={API.image(post.images[0]) } alt="post" /></Link>
		</div>
	);
}

export default GridElement;