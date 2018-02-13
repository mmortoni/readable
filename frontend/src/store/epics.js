import { combineEpics } from 'redux-observable';
import { values } from 'lodash';

import * as postsEpics from './posts/epics';
import * as commentsEpics from './comments/epics';
import * as categoriesEpics from './categories/epics';

const epics = [
  ...values(postsEpics),
  ...values(commentsEpics),
  ...values(categoriesEpics),
];

export default combineEpics(
  ...values(postsEpics),
  ...values(commentsEpics),
  ...values(categoriesEpics),
);
