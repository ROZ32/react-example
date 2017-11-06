import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
// import {TodoList} from './components/todolist_demo/todolist';
// import {CollapsibleContainer} from './components/collapsible_demo/collaps_container';
// import {Fetch} from './components/fetch_demo/fetch';
import {CurrenciesConverter} from './components/currencies_demo/currencies_converter';

import './styles/app.scss';

ReactDOM.render(
	<CurrenciesConverter />,
	document.getElementById('root')
);
