import React, { useEffect, useState, useCallback } from 'react';
import API from '../../api';
import GridElement from '../GridElement';
import './style.css';

function Grid(props) {
	const [posts, setPosts] = useState([]);
	const [nextPage, setNextPage] = useState(1);
	const userId = props.user;
	const loadPosts = useCallback(
		async (page) => {
			const r = await API.post.byUser(userId, page);
			setNextPage(r.data.nextPage);
			setPosts(p => [...p, ...r.data.docs]);
		}, [userId]
	)
	window.onscroll = async () => {
		if(window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight){
			if(nextPage) await loadPosts(nextPage);
		}
	}

	useEffect( () => {
		(async () => {
			loadPosts(1);
		})();
	}, [loadPosts]);

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