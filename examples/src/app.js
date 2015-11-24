import React from 'react';
import Gallery from 'react-photo-gallery';

var App = React.createClass({
	render: function() {
		return (
			<div><h1>app</h1>
				<Gallery />
			</div>
		)
	}
});

React.render(<App />, document.getElementById('app'));
