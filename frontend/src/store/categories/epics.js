import { keyBy } from 'lodash';
import { Observable } from 'rxjs/Observable';
import querystring from 'querystring';

import { CATEGORY } from '../../constants/constants'
import * as categoriesActions from './actionCreators';

export function getCategories(action$) {
  return action$.ofType(CATEGORY.CATEGORY_FETCH_COLLECTION)
    .map(action => action.payload)
    .switchMap(payload => {
      return Observable.fromPromise(
        instanceAxios.get(`/categories`)
      ).map(res => categoriesActions.fetchCategoriesSuccess(res.data, payload))
    })
}
