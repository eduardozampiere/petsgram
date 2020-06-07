import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
// import { Container } from './styles';
import "./style.css";
import API from '../../api';

import {BsChat} from 'react-icons/bs';
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai';
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io';
import Comments from '../Comments';

function Post(props){
	const images = props.data.images;
	const [showImage, setShowImage] = useState(0);
	const description = props.data.description;
	const likesList = props.data.likes;
	const createdAt = props.data.createdAt;
	const username = props.data.user.userName;
	const profilePhoto = props.data.user.profilePhoto;
	const postId = props.data._id;

	const userId = props.user._id;
	const [liked, setLiked] = useState(false);

	useEffect( () => {
		(async () => {
			const p = likesList.indexOf(userId);
			if(p !== -1) setLiked(true)
			else setLiked(false);
		})();
	}, [])

	function renderImages(){
		return (
			<>
				{(images.length > 1 ?
				<>		
					<div className="pos" onClick={nextImage}><IoIosArrowForward /></div>	
					<div className="pre" onClick={previousImage}><IoIosArrowBack /></div>
				</>
				: '')}
				<img src={API.image(images[showImage])}/>
			</>
		)
	}

	function previousImage(){
		const moment = showImage - 1;
		if(moment < 0){
			setShowImage(images.length - 1);
		}
		else{
			setShowImage(moment);
		}
	}

	function nextImage(){
		const moment = showImage + 1;
		if(moment > images.length - 1){
			setShowImage(0);
		}
		else{
			setShowImage(moment);
		}
	}

	function viewActiveImage(){
		return images.map( (image, index) => {
			return <div key={`${image}_${index}`} className={`activeImage ${(index === showImage ? 'active' : '')}`}></div>
		})
	}

	function renderLike(){
		if(liked){
			return <AiFillHeart onClick={handleLike} className="liked" size={25}/>	
		}
		return <AiOutlineHeart onClick={handleLike} size={25}/>
	}

	function renderNumLikes(){
		const len = likesList.length;
		if(len <= 0 && !liked) return <span>Seja o primeiro a curtir!</span>
		
		else if(len > 0){
			return <span><b>{`Curtido por ${len} ${len > 1 ? 'pessoas' : 'pessoa'}`}</b></span>
		}
	}

	async function handleLike(){
		const response = await API.post.like(postId);
		const p = likesList.indexOf(userId);
		if(liked){
			likesList.splice(p, 1);
			setLiked(false);
		}
		else{
			likesList.push(userId);
			setLiked(true);
		}

	}

	return (
		<div className="post">
			<div className="post-header">
				<div className="post-profile-photo">
					<img src={API.image(profilePhoto)}/>
				</div>
				<div className="post-author-user">
					<Link to={`/${username}`}>{username}</Link>
				</div>
				<div className="post-options">
					
				</div>
			</div>

			<div className="post-body">
				<div className="post-images">
					{renderImages()}
				</div>

				<div className="post-buttons">
					<div className="left">
						{renderLike()}
						<BsChat size={23}/>
					</div>

					<div className="middle">
						{viewActiveImage()}
					</div>

					<div className="right">

					</div>
				</div>

				<div className="post-likes">
					<div className="post-num-likes">{renderNumLikes()}</div>
					<div className="post-description">
						
						{description
						? <><Link to={`/${username}`}>{username}</Link> <span>{description}</span></>
						: ''
						}

					</div>
				</div>
			</div>

			<div className="post-footer">
				<Comments post={postId} />
			</div>
		</div>
	);
}

export default Post;