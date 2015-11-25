import React from 'react';
import ReactDOM from 'react-dom';
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

ReactDOM.render(<App />, document.getElementById('app'));
