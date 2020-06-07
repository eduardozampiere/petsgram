import React, { useState, useEffect, useCallback } from 'react';

// import { Container } from './styles';
import './style.css';
import API from '../../api';
import { Link } from 'react-router-dom';

function Comments(props) {
	const [comment, setComment] = useState('');
	const [commentsList, setCommentsList] = useState([]);
	const post = props.post;
	const createdAt = props.createdAt;
	const loadComments = useCallback( 
		async (page=1) => {
			const r = await API.comment.get(post, page);
			if(r.data.comments.docs) setCommentsList(c => [...c, ...r.data.comments.docs]);
	}, [post]
	);

	useEffect(() => {
		(async () => {
			await loadComments();
		})();
	}, [loadComments]);

	function formatDate(date){
		const d = new Date(date);
		const now = new Date();
		const timeDate = d.getTime();
		const timeNow = now.getTime();

		const secDiff = (timeNow - timeDate) / 1000;
		if(secDiff < 60) return `${parseInt(secDiff)} segundos`;

		if(secDiff < 3600) return `${parseInt(secDiff/60)} minutos`;

		if(secDiff < 86400) return `${parseInt(secDiff/3600)} horas`;

		if(secDiff < 2592000) return `${parseInt(secDiff/86400)} dias`;

		if(secDiff < 31104000) return `${parseInt(secDiff/2592000)} meses`;
		
		return `${parseInt(secDiff/31104000)} anos`;
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
			<div>
				<time>Há {formatDate(createdAt)}</time>
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