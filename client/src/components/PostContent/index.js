import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../api';
import Post from '../Post';

import './style.css';
// import { Container } from './styles';

function PostContent() {
	const {id: postId} = useParams();
	const [post, setPost] = useState(null);
	const [user, setUser] = useState(null);
	useEffect( () => {
		(async () =>{
			const r = await API.user.getUser();
			setUser(r.data);
			
			const data = await API.post.byId(postId);
			setPost(data.data);
		})();
	}, [postId])

	if(!post) return <></>

	return(
		<div className="post-content">
			<Post data={post} user={user}/>
		</div>
	);
}

export default PostContent;