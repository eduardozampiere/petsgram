import React, { useState, useEffect } from 'react';
import API from '../../api';

// import { Container } from './styles';
import './style.css';
import { Link } from 'react-router-dom';
function Search() {
	const [search, setSearch] = useState('');
	const [results, setResults] = useState([]);

	document.onclick = () => {
		document.getElementsByClassName('results')[0].style.display = 'none';
	}

	useEffect( () => {
		( async () => {
			if(search.length >= 3){
				const response = await API.user.find(search);
				console.log(response);
				setResults(response.data);
				document.getElementsByClassName('results')[0].style.display = 'block';
			}
			else{
				setResults([]);
				document.getElementsByClassName('results')[0].style.display = 'none';
			}
		})();
	}, [search]);

	function renderResults(){
		if(results.length <= 0){
			return <div className="result-user"><p>Nenhum usuario encontrado</p></div>
		}

		return results.map(r => {
			return (
				<Link key={r._id} to={`/${r.userName}`}>
					<div className="result-user">
						<div className="image-result">
							{r.profilePhoto
							? <img alt="profile-link" src={API.image(r.profilePhoto)}/>
							: <div className="noPhoto"></div>
						}
						</div>
						<div className="profile-result">
							<div className="result-userName">
								<span>{r.userName}</span>
							</div>

							<div className="result-name">
								<span>{r.name}</span>
							</div>

						</div>
					</div>
				</Link>
			)
		});
	}

	return (
		<div className="header-search">
			<input type="text" name="search" value={search} onChange={(e) => setSearch(e.currentTarget.value)}/>
			<div className="results">
				{renderResults()}
			</div>
		</div>
	);
}

export default Search;