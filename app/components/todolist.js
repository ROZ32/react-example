import React from 'react';

import '../styles/app.scss'

// const Headline = () => {
// 	return <h1>Hello World!!!</h1>
// };

// const Greatings = (props) => {
// 	const {name} = props;
// 	return <p>This is a test text <b>{name}</b></p>
// };
const MESSAGE = 'No items on the list';

export class TodoList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			itemsList: ['test1', 'test2', 'test3'],
			message: ''
		};
	}

	addItem(event) {
		event.preventDefault();
		const {itemsList} = this.state;
		const newItem = this.newItem.value;
		const isOnTheList = itemsList.includes(newItem);

		if (isOnTheList) {
			this.setState({
				message: `Item '${newItem}' already on the list`
			})
		} else {
			newItem !== '' && this.setState({
				itemsList: [...itemsList, newItem],
				message: ''
			});
		}

		this.newItem.value = '';
	}

	removeItem(item) {
		const {itemsList} = this.state;
		itemsList.splice(itemsList.indexOf(item),1);
		
		this.setState({
			itemsList,
		});

		if (itemsList.length === 0) {
			this.setState({
				message: MESSAGE
			})
		}
	}

	removeAllItems() {
		this.setState({
			itemsList: [],
			message: MESSAGE
		})
	}

	render() {
		const {itemsList, message} = this.state;
		return (
			<div className="app-main-container">
				<div className="container">
					<h2>Todo List</h2>
					<div className="row justify-content-center">
						<div className="col-4">
							<form className="form-group" onSubmit={event => this.addItem(event)}>
								<label htmlFor="exampleInputEmail1">New list item</label>
								<div className="form-inline">
									<input ref={item => this.newItem = item} type="text" className="form-control" id="newItem" aria-describedby="newItem" placeholder="New item...">
									</input>
									<button type="submit" className="btn btn-primary">Add</button>
								</div>
							</form>
						</div>
					</div>
					{ 
						message !== '' && <p className="center text-danger">{message}</p>
					}
					{
						itemsList.length > 0 &&
						<table className="table table-hover table-inverse">
							<thead>
								<tr>
									<th>#</th>
									<th>Item</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{
	
									itemsList.map((item, index) => {
										return (
											<tr key={item}>
												<th scope="row">{index}</th>
												<td>{item}</td>
												<td>
													<button type="button" className="btn btn-secondary float-right" onClick={() => this.removeItem(item)}>Remove</button>
												</td>
											</tr>
										)
									})
								}
							</tbody>
							<tfoot>
								<tr>
									<td colSpan="3">
										<button type="button" className="btn btn-danger float-right" onClick={() => this.removeAllItems()}>Remove all</button>
									</td>
								</tr>
							</tfoot>
						</table>
					}
				</div>
			</div>
		)
	}
}