import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';

class TodoStore extends EventEmitter {
	constructor() {
		super()
		this.todos = [];
		this.showLoader = false;
	}

	getAll() {
		return this.todos;
	}

	getLoaderStatus() {
		return this.showLoader;
	}

	addTodo(name) {
		this.todos.push({
			name
		});

		this.emit('change')
	}

	appendTodos(newTodos) {
		this.todos = this.todos.concat(newTodos);

		this.emit('change');
	}

	loadingDataLoader() {
		this.emit('showLoader');
	}

	handleActions(action) {
		switch(action.type) {
			case 'ADD_TODO': {
				const {name} = action;
				if (name) this.addTodo(name);
				break;
			}
			case 'GET_TODOS': {
				this.appendTodos(action.todos);
				this.showLoader = false;
				this.loadingDataLoader();
				break;
			}
			case 'LOADING_TODOS': {
				this.showLoader = true;
				this.loadingDataLoader();
				break
			}
		}
	}
}

const todoStoreInstance = new TodoStore();

Dispatcher.register(todoStoreInstance.handleActions.bind(todoStoreInstance));

export default todoStoreInstance;