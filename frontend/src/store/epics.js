import { combineEpics } from 'redux-observable';
import { values } from 'lodash';

import * as postsEpics from './posts/epics';
import * as categoriesEpics from './categories/epics';

const epics = [
  ...values(postsEpics),
  ...values(categoriesEpics),
];

export default combineEpics(
  ...values(postsEpics),
  ...values(categoriesEpics),
);
