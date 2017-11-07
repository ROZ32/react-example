import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch

} from 'react-router-dom'

import Header from '../../components/global/Header';
import Footer from '../../components/global/Footer';

import Home from './Home';
import About from './About';
import Contact from './Contact';
import Post from './Post';
import NotFound from './NotFound';

class Layout extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<BrowserRouter>
				<div>
					<Header />
					<Switch>
						<Redirect exact from="/" to="/home"/>
						<Route path="/home" component={ Home }/>
						<Route path="/about" component={ About }/>
						<Route path="/contact" component={ Contact }/>
						<Route path="/post" component={ Post }/>
						<Route component={ NotFound }></Route>
					</Switch>
					<hr></hr>
					<Footer />
				</div>
			</BrowserRouter>
		);
	}
}

export default Layout;
