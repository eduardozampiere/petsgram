import React, { useState, useEffect } from 'react';
import {BsFillGearFill} from 'react-icons/bs';
import { useParams, Link } from 'react-router-dom';
import API from '../../api';
import Grid from '../Grid';
import './style.css';
function Profile() {
	const {username} = useParams();
	const [user, setUser] = useState(null);
	const [found, setFound] = useState(true);

	const [numPosts, setNumPosts] = useState(0);
	const [numFollows, setNumFollows] = useState(0);
	const [numFollowers, setNumFollowers] = useState(0);

	//0 ninguem segue ninguem
	//-1 seguir de volta
	//1 ja segue
	const [followStatus, setFollowStatus] = useState(0);
	const [followClick, setFollowClick] = useState('');
	useEffect( () => {
		(async () => {
			try{
				const r = await API.user.getUser(username);	
				await setUser(r.data);
				document.title = `${r.data.name} | @${r.data.userName}`;
				
				const postsResponse = await API.post.byUser(r.data._id);
				setNumPosts(postsResponse.data.totalDocs);
	
				const followResponse = await API.follow.follows(username);
				setNumFollows(followResponse.data.follows.totalDocs);
	
				const followerResponse = await API.follow.followers(username);
				setNumFollowers(followerResponse.data.follows.totalDocs);
	
				const followMe = followResponse.data.followMe;
				const iFollow = followerResponse.data.iFollow;
				
				if( iFollow ) setFollowStatus(1);
				else if(!iFollow && followMe) setFollowStatus(-1);
				else setFollowStatus(0);
			}
			catch(err){
				console.log(err.response);
				setFound(false);
			};
		})();

	}, [username, followClick]);

	async function handleFollow(event, user){
		try{
			await API.follow.followUser(user);
			setFollowClick(true);
		}
		catch(err){
			console.log(err.response);
		}
		
	}

	async function handleUnfollow(event, user){
		try{
			await API.follow.unfollowUser(user);
			setFollowClick(false);
		}
		catch(err){
			console.log(err.response);
		}
	}

	function followButton(){
		if(followStatus === 0) return <button onClick={(e) => handleFollow(e, user._id)}>Seguir</button>;
		else if(followStatus === -1) return <button onClick={(e) => handleFollow(e, user._id)}>Seguir de volta</button>;
		else if(followStatus === 1) return <button className="unfollow" onClick={(e) => handleUnfollow(e, user._id)}>Deixar de seguir</button>;
	}
	
	if(!found){
		return (
			<div>
				<p>Esta página não está disponível.</p>
				<p>O link em que você clicou pode não estar funcionando, ou a página pode ter sido removida. <Link to="/">Voltar para o Petsgram.</Link></p>
			</div>

		)
	}
	if(!user){
		return <></>
	}
	return (
		<div className="profile-container">
			<div className="profile-header">
				<div className="profile-image">
				{user.profilePhoto
				? <img alt="profile-link" src={API.image(user.profilePhoto) }/>
				: <div className="noPhoto"></div>
				}
				</div>

				<div className="profile-profile">
					<div className="profile-user">
						<h2>{user.userName}</h2>
						{user.userName === localStorage.getItem('@petsgram-user')
						 ? <Link to="/edit/profile"><BsFillGearFill size={20}/></Link>
						 : followButton()
						 }
					</div>
					<div className="profile-info">
						<div className="profile-info-item">
							<b>{numPosts}</b><span>Publicações</span>
						</div>

						<div className="profile-info-item">
							<b>{numFollowers}</b><span>Seguidores</span>
						</div>

						<div className="profile-info-item">
							<b>{numFollows}</b><span>Seguindo</span>
						</div>
					</div>
					<div className="profile-name">
						<h5>{user.name}</h5>
					</div>
				</div>		
			</div>

			<div className="profile-content">
				<Grid user={user._id}/>
			</div>
		</div>
	)
}

export default Profile;