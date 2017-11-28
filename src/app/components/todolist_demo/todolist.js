import React from 'react';
import classNames from 'classnames';
// import Todo from './todo';
import TodoStore from '../../stores/TodoStore';
import TodoActions from '../../actions/TodoActions';

// import '../../styles/basic_demos.scss';
import '../../styles/todolist.scss'

const MESSAGE = 'No items on the list';

class TodoList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			todos: [],
			removeAllShowMessage: false,
			message: '',
			loading: false
		};

		this.getTodos = this.getTodos.bind(this);
		this.showTodosLoader = this.showTodosLoader.bind(this);
	}

	addItem(event) {
		event.preventDefault();
		const {todos} = this.state;

		if (todos.length === 10) {
			this.setState({
				message: `hold it there cowboy, there is to many items on the list,
					you may want to finish some items first`
			});
			return;
		}

		const newItemValue = this.newItem.value;
		const isOnTheList = todos.filter(currentItem => { return currentItem.name === newItemValue});

		if (isOnTheList.length > 0) {
			this.setState({
				message: `Item '${newItemValue}' already on the list`
			});
		} else {
			TodoActions.addTodo(newItemValue);
		}

		this.newItem.value = '';
	}

	removeItem(index) {
		const {todos} = this.state;
		todos.splice(index,1);
		
		this.setState({
			todos,
		});

		if (todos.length === 0) {
			this.setState({
				message: MESSAGE
			})
		}
	}

	removeAllItems() {
		this.setState({
			todos: [],
			message: MESSAGE,
			removeAllShowMessage: false
		})
	}

	__repeatedName(name) {
		const {todos} = this.state;
		const isOnTheList = todos.filter(currentItem => { return currentItem.name === name});
		return isOnTheList.length > 0 ? true : false;
	}

	editItem(item, index) {
		const {todos} = this.state;
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
		todos.splice(index,1, item);
		this.setState({
			todos,
			message: ''
		});
	}

	toggleRemoveAll () {
		this.setState({
			removeAllShowMessage: true
		});
	}

	toggleEdit(item, index) {
		const {todos} = this.state;
		item.edit = !item.edit;

		todos.splice(index,1, item);
		this.setState({
			todos
		});
	}

	toggleItemStatus(item, index) {
		const {todos} = this.state;
		item.done = !item.done;

		todos.splice(index,1, item);
		this.setState({
			todos
		});
	}

	getTodos() {
		this.setState({
			todos: TodoStore.getAll()
		});
	}

	showTodosLoader() {
		this.setState({
			loading: TodoStore.getLoaderStatus()
		});
	}

	componentWillMount() {
		TodoStore.on('change', this.getTodos);
		TodoStore.on('showLoader', this.showTodosLoader);

		TodoActions.getAsyncTodos();
	}

	componentWillUnmount() {
		TodoStore.removeListener('change', this.getTodos);
		TodoStore.removeListener('showLoader', this.showTodosLoader);
	}

	render() {
		const {todos, message, removeAllShowMessage, loading} = this.state;

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
						todos.length > 0 &&
						<table className="table table-hover table-inverse">
							<thead>
								<tr>
									<th width="5%">#</th>
									<th width="85%">Item</th>
									<th width="10%">Actions</th>
								</tr>
							</thead>
							<tbody>
								{
	
									todos.map((item, index) => {
										return (
											<tr key={item.name}>
												<th scope="row">{index}</th>
												<td className={classNames({'item-done': item.done})}>
												{
													item.edit ? <input type="text" placeholder={item.name} defaultValue={item.name} ref={(edit) => this["edit-" + item.name] = edit }/> : item.name
												}
												</td>
												<td>
													{
														!item.edit ?
														<div className="actions-buttons">
															<a onClick={() => this.toggleItemStatus(item, index)}>
																{
																	item.done ? <i className="fa fa-check-square-o" aria-hidden="true"></i> :
																		<i className="fa fa-square-o" aria-hidden="true"></i>
																}
															</a>
															<a onClick={() => this.toggleEdit(item, index)}>
																<i className="fa fa-pencil" aria-hidden="true"></i>
															</a>
															<a onClick={() => this.removeItem(index)}>
																<i className="fa fa-times" aria-hidden="true"></i>
															</a>
														</div> :
														<div className="actions-buttons">	
															<a onClick={() => this.editItem(item, index)}>
																<i className="fa fa-pencil-square-o" aria-hidden="true"></i>
															</a>
															<a onClick={() => this.toggleEdit(item, index)}>
																<i className="fa fa-window-close" aria-hidden="true"></i>
															</a>
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
										{
											!removeAllShowMessage ?
												<button type="button" className="btn btn-danger float-right" onClick={() => this.toggleRemoveAll()}>Remove all</button> :
												<div className="pull-right">
													<p>Are you sure you want to delete all the todos? <button type="button" className="btn btn-danger float-right" onClick={() => this.removeAllItems()}>Yeah delete all</button></p>
												</div>
										}
									</td>
								</tr>
							</tfoot>
						</table>
					}
					{
						loading &&
						<div className="loader-loading">
							<i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
							<span className="sr-only">Loading...</span>
						</div>
					}
				</div>
			</div>
		)
	}
}

export default TodoList;
