import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import categories from './categories/reducer';
import posts from './posts/reducer';

export default combineReducers({
  categories,
  posts,
  routing: routerReducer
});
