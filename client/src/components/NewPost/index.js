import React, { useState } from 'react';

import './style.css';
import API from '../../api';
function NewPost() {
	const [posting, setPosting] = useState(false);

	async function handleSubmit(e){
		e.preventDefault();
		const form = e.currentTarget;
		const images = e.currentTarget.childNodes[0].value;
		console.log(images);
		if(!images){
			return false;
		}

		const formdata = new FormData(form);
		setPosting(true);
		try{
			await API.post.create(formdata);
			document.location.reload();
		}
		catch(err){
			console.log(err.response);
		}
		setPosting(false);
	}
	return (
		<section className="new">
			<form encType="mulipart/formdata" onSubmit={handleSubmit}>
				<input type="file" name="image[]" multiple/>
				<textarea name="description"></textarea>
				<button>{!posting ? 'Postar' : 'Postando...'}</button>
			</form>
		</section>);
}

export default NewPost;