import { keyBy } from 'lodash';
import axios from 'axios';
import querystring from 'querystring';
import * as actionTypes from './actionTypes';

const api = process.env.REACT_APP_READABLE_API || "http://localhost:3030";

export function getCategory(id) {
  return function (dispatch) {
    return axios.get(`${api}/categories/${id}`)
      .then((res) => {
        dispatch({type: actionTypes.CATEGORY_FETCH_ONE_SUCCESS, payload: res.data});
      })
  };
}

export function getCategories(params) {
  return function (dispatch) {
    return axios.get(`${api}/categories?${querystring.stringify(params)}`)
      .then((res) => {
        const byId = keyBy(res.data, (category) => category.id);
        dispatch({type: actionTypes.CATEGORY_FETCH_SUCCESS, payload: {byId, params}});
      })
  };
}

export function createCategory(category) {
  return function (dispatch) {
    return axios.post(`${api}/categories`, category)
      .then((res) => {
        dispatch({type: actionTypes.CATEGORY_CREATE_SUCCESS, payload: res.data});
      })
  };
}

export function updateCategory(category) {
  return function (dispatch) {
    return axios.put(`${api}/categories/${category.id}`, category)
      .then((res) => {
        dispatch({type: actionTypes.CATEGORY_UPDATE_SUCCESS, payload: res.data});
      })
  };
}

export function deleteCategory(id) {
  return function (dispatch) {
    return axios.delete(`${api}/categories/${id}`)
      .then((res) => {
        dispatch({type: actionTypes.CATEGORY_DELETE_SUCCESS, payload: id});
      })
  };
}
