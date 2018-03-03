// SurveyField contains logic to render a single
// label and text input
import React from 'react';

export default ({ input, label, meta: { error, touched } }) => {	// props.input
	return (
		<div>
			<label>{label}</label>
			{/* ↓↓↓ equals to onBlur={input.onBlur} onChange={input.onChange} ... */}
			<input {...input} style={{ marginBottom: '5px' }} />
			<div className="red-text" style={{ marginBottom: '20px' }}>
				{touched && error}
			</div>	{/* if `touched` is true, display error to user */}
		</div>
	);
};