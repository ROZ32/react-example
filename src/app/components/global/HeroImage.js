import React, { Component } from 'react';
import PropTypes from 'prop-types';

import homeImg from '../../images/home-bg.jpg';
import aboutImg from '../../images/about-bg.jpg';
import contactImg from '../../images/contact-bg.jpg';
import postImg from '../../images/post-bg.jpg';

class HeroImage extends Component {
	constructor(props) {
		super(props);
	}

	headerInfo() {
		const { id } = this.props.match.params;
		let headerConfig = {
			headerStyle: {
				backgroundImage: `url(${homeImg})`,
			},
			title: 'Clean Blog',
			text: 'A Blog Theme by Start Bootstrap.'
		};
		switch(id) {
			case 'about':
				headerConfig.headerStyle = {
					backgroundImage: `url(${aboutImg})`,
				};
				headerConfig.title = 'About Me';
				headerConfig.text = 'This is what I do';
				break;
			case 'contact':
				headerConfig.headerStyle = {
					backgroundImage: `url(${contactImg})`,
				};
				headerConfig.title = 'Contact Me';
				headerConfig.text = 'Have questions? I have answers.';
				break;
			case 'post':
				headerConfig.headerStyle = {
					backgroundImage: `url(${postImg})`,
				};
				headerConfig.title = 'Man must explore, and this is exploration at its greatest';
				headerConfig.text = 'Have questions? I have answers.';
				break;
			case 'todo':
				headerConfig.title = 'Todo list';
				headerConfig.text = 'Get organized fast with this simple and clean todo list.';
		}
		return headerConfig;
	}

	render() {
		let { headerStyle, title, text } = this.headerInfo();

		return (
			<header className="masthead test" style={headerStyle}>
				<div className="overlay"></div>
				<div className="container">
				<div className="row">
					<div className="col-lg-8 col-md-10 mx-auto">
					<div className="site-heading">
						<h1>{title}</h1>
						{	
							this.props.match.params.id !== 'post' && <span className="subheading">{text}</span> 
						}
						{
							this.props.match.params.id === 'post' &&
							<div>
								<h2 className="subheading">Problems look mighty small from 150 miles up</h2>
								<span className="meta">Posted by <a href="#">Start Bootstrap</a> on August 24, 2017</span>
							</div>	
						}
					</div>
					</div>
				</div>
				</div>
			</header>
		);
	}
}

HeroImage.propTypes = {
	match: PropTypes.object,
};

export default HeroImage;
