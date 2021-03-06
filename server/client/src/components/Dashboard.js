import React from 'react';
import { Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList';

const Dashboard = () => {
	return (
		<div style={{ width: '100%', margin: 'auto' }}>
			<SurveyList />
			<div className="fixed-action-btn">
				<Link to="/surveys/new" className="btn-floating btn-large red" title="Add new survey">
					<i className="material-icons">add</i>
				</Link>
			</div>
		</div>
	);
};

export default Dashboard;