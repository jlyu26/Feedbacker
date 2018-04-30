import React from 'react';

const Landing = () => {
	return (
		<div style={{ textAlign: 'center', height: 'calc(100vh - 170px)', minHeight: '480px'}}>
			<div style={{ marginTop: '40px', color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.35)', width: '70%', margin: 'auto', lineHeight: '2' }}>
				<h4 style={{ fontWeight: '600' }}>Collect Feedback as Event Organizer</h4>
				<div style={{ fontSize: '16px' }}>
					<ul>
						<li>1. Login with Google account</li>
						<li>2. Create new survey</li>
						<li>3. Enter list of emails</li>
						<li>4. Send survey to mail list</li>
						<li>5. Check feedback on dashboard</li>
					</ul>
				</div>
			</div>			
		</div>
	);
};

export default Landing;