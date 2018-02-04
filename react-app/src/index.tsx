import * as React from 'react';
import * as ReactDOM from 'react-dom';

// Redux
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';

// Router
import createBrowserHistory from 'history/createBrowserHistory';
import { Route } from 'react-router';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { scrumEpic } from './actions/epics';
import { scrumReducer } from './reducers';

let history = createBrowserHistory();

const epicMiddleware = createEpicMiddleware(scrumEpic);
const middleware = routerMiddleware(history);

const scrumStore = createStore(scrumReducer, composeWithDevTools(
    applyMiddleware(epicMiddleware, middleware)
));

ReactDOM.render(
    <Provider store={scrumStore}>
        <ConnectedRouter history={history}>
            <Route path="/" component={App}/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
