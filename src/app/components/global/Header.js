import React, { Component } from 'react';
import {
	Link,
	Route
} from 'react-router-dom'

import HeroImage from './HeroImage';

class Header extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
					<div className="container">
					<Link className="navbar-brand" to="/">Start Bootstrap</Link>
					<button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
						Menu
						<i className="fa fa-bars"></i>
					</button>
					<div className="collapse navbar-collapse" id="navbarResponsive">
						<ul className="navbar-nav ml-auto">

						<li className="nav-item">
							<Link className="nav-link" to="/">Home</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/about">About</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/post">Sample Post</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/contact">Contact</Link>
						</li>
						</ul>
					</div>
					</div>
				</nav>
				<Route path="/:id" component={ HeroImage }/>
			</div>
		);
	}
}

export default Header;
