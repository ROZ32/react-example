import React from 'react';
import classNames from 'classnames';

import '../../styles/basic_demos.scss';
import '../../styles/todolist.scss'

const MESSAGE = 'No items on the list';

export class TodoList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			itemsList: [{
				name: 'test1'
			}, {
				name: 'test2'
			}, {
				name: 'test3'
			}],
			message: ''
		};
	}

	addItem(event) {
		event.preventDefault();
		const {itemsList} = this.state;
		const newItemValue = this.newItem.value;
		const isOnTheList = itemsList.filter(currentItem => { return currentItem.name === newItemValue});

		if (isOnTheList.length > 0) {
			this.setState({
				message: `Item '${newItemValue}' already on the list`
			})
		} else {
			newItemValue !== '' && this.setState({
				itemsList: [...itemsList, { name: newItemValue }],
				message: ''
			});
		}

		this.newItem.value = '';
	}

	removeItem(index) {
		const {itemsList} = this.state;
		itemsList.splice(index,1);
		
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

	__repeatedName(name) {
		const {itemsList} = this.state;
		const isOnTheList = itemsList.filter(currentItem => { return currentItem.name === name});
		return isOnTheList.length > 0 ? true : false;
	}

	editItem(item, index) {
		const {itemsList} = this.state;
		const editValue = this["edit-" + item.name].value;
		
		if (editValue !== '' && editValue !== item.name) {
			if (!this.__repeatedName(editValue)) {
				item.name = editValue;
			} else {
				this.setState({
					message: `Item '${editValue}' already on the list`
				});
				return;
			}
		}

		item.edit = false;
		itemsList.splice(index,1, item);
		this.setState({
			itemsList,
			message: ''
		});
	}

	toggleEdit(item, index) {
		const {itemsList} = this.state;
		item.edit = !item.edit;

		itemsList.splice(index,1, item);
		this.setState({
			itemsList
		});
	}

	toggleItemStatus(item, index) {
		const {itemsList} = this.state;
		item.done = !item.done;

		itemsList.splice(index,1, item);
		this.setState({
			itemsList
		});
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
									<th width="10%">#</th>
									<th width="65%">Item</th>
									<th width="25%">Actions</th>
								</tr>
							</thead>
							<tbody>
								{
	
									itemsList.map((item, index) => {
										return (
											<tr key={item.name}>
												<th scope="row">{index}</th>
												<td className={classNames({'item-done': item.done})}>
												{
													item.edit ? <input type="text" placeholder={item.name} defaultValue={item.name} ref={(edit) => this["edit-" + item.name] = edit }/> : item.name
												}
												</td>
												<td className="pull-right">
													{	
														!item.edit &&
														<div className="actions-buttons">
															<button
																type="button"
																className="btn btn-success"
																onClick={() => this.toggleItemStatus(item, index)}>
																{item.done ? 'Uncheck' : 'Check'}
															</button>
															<button type="button" className="btn btn-warning" onClick={() => this.toggleEdit(item, index)}>Edit</button>
															<button type="button" className="btn btn-danger" onClick={() => this.removeItem(index)}>Remove</button>
														</div>
													}
													{
														item.edit &&
														<div className="actions-buttons">															
															<button type="button" className="btn btn-info" onClick={() => this.editItem(item, index)}>Change</button>
															<button type="button" className="btn btn-secondary" onClick={() => this.toggleEdit(item, index)}>Cancel</button>
														</div>
													}
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