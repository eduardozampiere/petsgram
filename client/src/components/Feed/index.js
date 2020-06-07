import React, { useState, useEffect, useCallback } from 'react';
import API from '../../api';
import Post from '../Post';
import './style.css';
function Feed() {
	const [feed, setFeed] = useState([]);
	const [nextPage, setNextPage] = useState(null);
	const [user, setUser] = useState({});
	const loadPosts = useCallback(
		async (page) => {
			try{
				const r = await API.user.getUser();
				setUser(r.data);
				const response = await API.post.feed(page);
				setFeed(f => [...f, ...response.data.docs]);
				setNextPage(response.data.nextPage);
			}catch(err){
				console.log(err.response);
			}
		}, []
	)	
	window.onscroll = async () => {
		if(window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight){
			if(nextPage) await loadPosts(nextPage);
		}
	}
	
	useEffect( () => {
		(async function(){
			await loadPosts(1);
		})();
	}, [loadPosts]);


	function renderFeed(){
		return feed.map(post => {
			return <Post key={post._id} data={post} user={user}/>
		});
	}

	return (
		<div className="feed">
			{renderFeed()}	
		</div>);
}

export default Feed;