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

/*
export function getCategory(id) {
  return function (dispatch) {
    return Observable.fromPromise(
      instanceAxios.get(`/categories/${ id }`)
    ).map(res => {dispatch({type: CATEGORY.CATEGORY_FETCH_ONE_SUCCESS, payload: res.data})});
  }
}

export function getCategories(params) {
  return function (dispatch) {
    return instanceAxios.get(`${api}/categories?${querystring.stringify(params)}`)
      .then((res) => {
        const byId = keyBy(res.data, (category) => category.id);
        dispatch({type: CATEGORY.CATEGORY_FETCH_SUCCESS, payload: {byId, params}});
      })
  };
}

export function createCategory(category) {
  return function (dispatch) {
    return instanceAxios.post(`/categories`, category)
      .then((res) => {
        dispatch({type: CATEGORY.CATEGORY_CREATE_SUCCESS, payload: res.data});
      })
  };
}

export function updateCategory(category) {
  return function (dispatch) {
    return instanceAxios.put(`/categories/${category.id}`, category)
      .then((res) => {
        dispatch({type: POST.CATEGORY_UPDATE_SUCCESS, payload: res.data});
      })
  };
}

export function deleteCategory(id) {
  return function (dispatch) {
    return instanceAxios.delete(`/categories/${id}`)
      .then((res) => {
        dispatch({type: CATEGORY.CATEGORY_DELETE_SUCCESS, payload: id});
      })
  };
}
*/
