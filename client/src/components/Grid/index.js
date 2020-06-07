import React, { useEffect, useState } from 'react';
import API from '../../api';
import GridElement from '../GridElement';
import './style.css';

function Grid(props) {
	const [posts, setPosts] = useState([]);
	const [nextPage, setNextPage] = useState(1);
	const userId = props.user;

	window.onscroll = async () => {
		if(window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 200){
			if(nextPage) await loadPosts(nextPage);
		}
	}

	useEffect( () => {
		(async () => {
			loadPosts(1);
		})();
	}, []);

	async function loadPosts(page){
		const r = await API.post.byUser(userId, page);
		setNextPage(r.data.nextPage);
		setPosts([...posts, ...r.data.docs]);
	}

	function drawGrid(){
		return posts.map(post => <GridElement key={post._id} post={post} />);
	}

	return (
		<div className="grid">
			{drawGrid()}
		</div>
	);
}

export default Grid;