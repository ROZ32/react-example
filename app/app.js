import React from 'react';
import ReactDOM from 'react-dom';

const Headline = () => {
	return <h1>Hello World!!!</h1>
};

const Greatings = (props) => {
	const {name} = props;
	return <p>This is a test text <b>{name}</b></p>
};

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			itemsList: ['test1', 'test2', 'test3']
		};
	}

	render() {
		const {itemsList} = this.state;
		return (
			<div>
				<Headline />
				<Greatings name="John Doe"/>
				{
					itemsList.map(item => {
						return <p key={item}>{item}</p>
					})
				}
			</div>
		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('root')
);
