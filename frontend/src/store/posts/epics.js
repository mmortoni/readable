import { keyBy } from 'lodash';
import axios from 'axios';
import querystring from 'querystring';
import { Observable } from 'rxjs/Observable';
import { push } from 'react-router-redux';

import * as actionTypes from './actionTypes';
import * as postsActions from './actionCreators';

const api = process.env.REACT_APP_READABLE_API || "http://localhost:3030";
let token = localStorage.token;

if (!token)
token = localStorage.token = Math.random()
                                .toString(36)
                                .substr(-8);

const headers = {
    Accept: "application/json",
    Authorization: token,
    "Content-Type": "application/json"
};

export function fetchPost(action$) {
  return action$.ofType(actionTypes.FETCH_ONE)
    .map(action => action.payload)
    .switchMap(id => {
      return Observable.fromPromise(
        axios.get(`${api}/posts/${id}`, {headers: headers})
      ).map(res => postsActions.fetchPostSuccess(res.data));
    });
}

export function fetchPosts(action$) {
  return action$.ofType(actionTypes.FETCH_COLLECTION)
    .map(action => action.payload)
    .switchMap(params => {
      return Observable.fromPromise(
        axios.get(`${api}/posts?${querystring.stringify(params)}`, {headers: headers})
      ).map(res => postsActions.fetchPostsSuccess(res.data, params, { sortDesc: false, sortKey: 'voteScore' }));
    });
}

export function sortPosts(action$) {
  return action$.ofType(actionTypes.SORT_COLLECTION)
    .map(action =>  postsActions.sortSuccess(action.payload.props.posts, action.payload.props.params, action.payload.sortParams));
}

export function updatePost(action$) {
  return action$.ofType(actionTypes.UPDATE)
    .map(action => action.payload)
    .switchMap(post => {
      return Observable.merge(
        Observable.fromPromise(
          axios.put(`${api}/posts/${post.id}`, post, {headers: headers})
        ).map(res => postsActions.updatePostSuccess(res.data)),
        Observable.of(push('/posts'))
      );
    });
}

export function createPost(action$) {
  return action$.ofType(actionTypes.CREATE)
    .map(action => action.payload)
    .switchMap(post => {
      return Observable.merge(
        Observable.fromPromise(
          axios.post(`${api}/posts`, post)
        ).map(res => postsActions.createPostSuccess(res.data)),
        Observable.of(push('/posts'))
      );
    });
}

export function deletePost(action$) {
  return action$.ofType(actionTypes.DELETE)
    .map(action => action.payload)
    .switchMap(post => {
      return Observable.fromPromise(
        axios.delete(`${api}/posts/${post.id}`, {headers: headers})
      ).map(res => postsActions.deletePostSuccess(post));
    });
}
