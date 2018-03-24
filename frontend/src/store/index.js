import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import rootEpic from './epics';

const logger = createLogger({ collapsed: true });

const epicMiddleware = createEpicMiddleware(rootEpic);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      epicMiddleware,
      logger,
      routerMiddleware(hashHistory),
      thunk,
    )
  )
);
