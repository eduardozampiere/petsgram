import React, { useState, useEffect } from 'react';

// import { Container } from './styles';
import './style.css';
import API from '../../api';
import { Link } from 'react-router-dom';

function Comments(props) {
	const [comment, setComment] = useState('');
	const [commentsList, setCommentsList] = useState([]);
	const post = props.post;

	useEffect(() => {
		(async () => {
			await loadComments();
		})();
	}, []);

	async function loadComments(page=1){
		const r = await API.comment.get(post, page);
		if(r.data.comments.docs) setCommentsList([...commentsList, ...r.data.comments.docs]);
	}

	function drawComments(){
		return commentsList.slice(0).reverse().map(c => {
			return (
				<div key={c._id} className="comment-item">
					<Link to="/">{c.user.userName}</Link>
					<span>{c.comment}</span>
				</div>
			)
		});
	}

	async function handleSubmit(e){
		e.preventDefault();
		if(!comment) return false;

		try{
			const r = await API.comment.create(post, comment);
			console.log(r.data);
			setCommentsList([r.data, ...commentsList]);
			setComment('');
			// Array.from(document.getElementsByClassName('comments-comments')).map(r => r.scrollTo(0, 0))

		}catch(err){
			console.log(err.response);
		}
	}

	return(
		<div className="comments">
			<div className="comments-comments">
				{drawComments()}
			</div>

			<div className="comments-input">
				<form onSubmit={handleSubmit}>
					<input type="text" value={comment} placeholder="Digite seu comentario" onChange={(e) => setComment(e.currentTarget.value)}/>
					<button>Publicar</button>
				</form>
			</div>
		</div>
	);
}

export default Comments;