import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Collapsible extends Component {
	constructor(props) {
		super(props);
	}

	generateUUID() {
		let d = new Date().getTime();
		let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			let r = (d + Math.random() * 16) % 16 | 0;
			d = Math.floor(d / 16);
			return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
		});

		return uuid;
	}

	render() {
		const {title, children, collapsibleShow, id} = this.props;
		const componentId = id ? id : this.generateUUID();

		return (
			<div>
				<div className="collpasible-header" id={ `heading-${componentId}` }>
					<h5 className="mb-0">
						<p data-toggle="collapse"
							data-parent="#accordion"
							href={ `#collapse-${componentId}`}
							aria-expanded="true"
							aria-controls={`collapse-${componentId}`}>
							{title}
						</p>
					</h5>
				</div>
				<hr/>
				<div id={`collapse-${componentId}`}
					className={`collapse ${collapsibleShow ? 'show' : ''}`}
					role="tabpanel"
					aria-labelledby={ `heading-${componentId}` }>
					<div className="collpasible-block">
						{children}
					</div>
				</div>
			</div>
		);
	}

}

Collapsible.propTypes = {
	title: PropTypes.string,
	children: PropTypes.node,
	collapsibleShow: PropTypes.bool,
	id: PropTypes.number
}

export default Collapsible;
