import React from 'react';

import EditSideBar from '../EditSideBar';
import './style.css';
function Edit(props) {
	
	return (
		<div className="edit-container">	
			<EditSideBar />
			{props.children}
		</div>
	);

}

export default Edit;