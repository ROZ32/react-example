import React from 'react';
import ReactDOM from 'react-dom';

// import {TodoList} from './components/todolist_demo/todolist';
// import {CollapsibleContainer} from './components/collapsible_demo/collaps_container';
// import {Fetch} from './components/fetch_demo/fetch';
// import {CurrenciesConverter} from './components/currencies_demo/currencies_converter';

import Layout from './pages/blog/Layout';
import './styles/blog/clean-blog.scss';

const app = document.getElementById('root');

ReactDOM.render(
	<Layout />,
	app
);
