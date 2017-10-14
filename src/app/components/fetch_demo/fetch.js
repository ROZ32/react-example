import React from 'react';
import image from '../../images/cloud-upload-download-data-transfer.svg';

import Collapsible from '../collapsible_demo/collapsible';
import '../../styles/collapsible_demo.scss';

// const Contact = (props) => {
// 	return (
// 		<div>test {props.test}</div>
// 	);
// };

// Contact.propTypes = {
//     title: PropTypes.string,
//     prop: PropTypes.node,
// };

export class Fetch extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			contacts: [],
			error: ''
		};
	}

	componentWillMount() {
		const contacts = localStorage.getItem('contacts');
		if(contacts) {
			this.setState({
				contacts: JSON.parse(contacts),
				isLoading: false
			})
		}
	}

	componentWillUpdate(nextProps, nextState) {
		localStorage.setItem('contacts', JSON.stringify(nextState.contacts));
		localStorage.setItem('contactsDate', JSON.stringify(Date.now()));
	}

	componentDidMount() {
		const contactsDate = localStorage.getItem('contactsDate');
		if (contactsDate) {
			let dateDiff = Math.round((Date.now() - parseInt(contactsDate)) / (1000 * 60));
			if(dateDiff > 15) this.fetchData();
		} else {
			this.fetchData();
		}
	}

	fetchData() {
		this.setState({
			contacts: [],
			isLoading: true
		});

		fetch(
			'https://randomuser.me/api/?results=3&nat=us,dk,fr,gb'
		).then(response => response.json()
		).then(parsedJson => parsedJson.results.map(contact => (
					{
						name: `${contact.name.title}. ${contact.name.first} ${contact.name.last}`,
						username: contact.login.username,
						email: contact.email,
						location: `${contact.location.street}, ${contact.location.city}`
					}
				)
			)
		).then(contacts => {
			this.setState({
				contacts,
				isLoading: false,
				error: ''
			});
		}).catch(error => {
			this.setState({
				error
			})
		});
	}

	render() {
		const {isLoading, contacts, error} = this.state;
		return (
			<div>
				<header>
					<img src={image} />
					<h1>Contacts Information <button className="btn btn-danger" onClick={() => {this.fetchData()}}>Fetch Now</button></h1>
				</header>
				<div className={`content ${isLoading ? 'is-loading' : ''}`}>
					{
						error !== '' && <p className="text-danger">{error}</p>
					}
					<div id="accordion" role="tablist" aria-multiselectable="true">
						{
							!isLoading && contacts.length > 0 ? contacts.map((contact, key) => {
								return (
									<Collapsible key={key}
										title={contact.name}>
										<ul>
											<li>{`Username: ${contact.username}`}</li>
											<li>{`Email: ${contact.email}`}</li>
											<li>{`Location: ${contact.location}`}</li>
										</ul>
									</Collapsible>
								)
							}) : null
						}
					</div>
					{
						isLoading &&
						<div className="loader">
							<div className="icon"></div>
						</div>
					}
				</div>
			</div>
		);
	}
}
