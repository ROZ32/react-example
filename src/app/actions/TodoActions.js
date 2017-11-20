import Dispatcher from '../dispatcher';

const actions = {
	addTodo: (name) => {
		Dispatcher.dispatch({
			type: 'ADD_TODO',
			name
		});
	}
}

export default actions;
