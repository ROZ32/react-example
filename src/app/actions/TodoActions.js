import Dispatcher from '../dispatcher';

const actions = {
	addTodo: (name) => {
		Dispatcher.dispatch({
			type: 'ADD_TODO',
			name
		});
	}, 

	getAsyncTodos: () => {
		Dispatcher.dispatch({type: 'LOADING_TODOS'});
		setTimeout(() => {
			Dispatcher.dispatch({
				type: 'GET_TODOS',
				todos: [{
					name: 'test0'
				}, {
					name: 'test1'
				}, {
					name: 'test2'
				}, {
					name: 'test_from_server1'
				}, {
					name: 'test_from_server2'
				}, {
					name: 'test_from_server3'
				}]
			});
		}, 2500);
	}
}

export default actions;
