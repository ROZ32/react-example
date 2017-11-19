import React, { Component } from 'react';
import {
	Link
} from 'react-router-dom'

class NotFound extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<article>
				<div className="container">
					<div className="row">
						<div className="col-lg-8 col-md-10 mx-auto">
							<h2>Opss, 404 Page Not Found !!!</h2>
							<p>Try go <Link to="/home">Home</Link> ;)</p>
						</div>
					</div>
				</div>
			</article>
		);
	}
}

export default NotFound;
