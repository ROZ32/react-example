import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';

class TodoStore extends EventEmitter {
	constructor() {
		super()
		this.todos = [{
			name: 'test0'
		}, {
			name: 'test1'
		}, {
			name: 'test2'
		}];
	}

	getAll() {
		return this.todos;
	}

	addTodo(name) {
		this.todos.push({
			name
		});

		this.emit('change')
	}

	handleActions(action) {
		switch(action.type) {
			case 'ADD_TODO': {
				const {name} = action;
				if (name) this.addTodo(name);
			}
		}
	}
}

const todoStoreInstance = new TodoStore();

Dispatcher.register(todoStoreInstance.handleActions.bind(todoStoreInstance));

export default todoStoreInstance;