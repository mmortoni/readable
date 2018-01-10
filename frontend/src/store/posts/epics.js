import { keyBy } from 'lodash';
import axios from 'axios';
import querystring from 'querystring';
import { Observable } from 'rxjs/Observable';
import { push } from 'react-router-redux';

import * as actionTypes from './actionTypes';
import * as postsActions from './actionCreators';

let token = localStorage.token;

if (!token)
token = localStorage.token = Math.random()
                                .toString(36)
                                .substr(-8);

const instanceAxios = axios.create({
  baseURL: process.env.REACT_APP_READABLE_API || 'http://localhost:3030',
  timeout: 5000,
  headers: {
    'Accept': 'application/json',
    'Authorization': token,
    'Content-Type': 'application/json'
  }
})

export function fetchPost(action$) {
  return action$.ofType(actionTypes.POST_FETCH_ONE)
    .map(action => action.payload)
    .switchMap(id => {
      return Observable.fromPromise(
        instanceAxios.get(`/posts/${ id }`)
      ).map(res => postsActions.fetchPostSuccess(res.data));
    });
}

export function fetchPosts(action$) {
  return action$.ofType(actionTypes.POST_FETCH_COLLECTION)
    .map(action => action.payload)
    .switchMap(params => {
      return Observable.fromPromise(
        instanceAxios.get(`/posts?${ querystring.stringify(params) }`)
      ).map(res => postsActions.fetchPostsSuccess(res.data, params, { sortDesc: false, sortKey: 'voteScore', sortOrder: ['asc'] }))
    })
}

export function sortPosts(action$) {
  return action$.ofType(actionTypes.POST_SORT)
    .map(action =>  postsActions.sortSuccess(action.payload.props.posts, action.payload.props.params, action.payload.sortParams));
}

export function updatePost(action$) {
  return action$.ofType(actionTypes.POST_UPDATE)
    .map(action => action.payload)
    .switchMap(post => {
      return Observable.merge(
        Observable.fromPromise(
          instanceAxios.put(`/posts/${ post.id }`, {title: post.title, body: post.body})
        ).map(res => postsActions.updatePostSuccess(res.data)),
        Observable.of(push('/posts'))
      );
    });
}

export function votePost(action$) {
  return action$.ofType(actionTypes.POST_VOTE)
    .map(action => action.payload)
      .switchMap(payload => {
        return Observable.merge(
        Observable.fromPromise(
          instanceAxios.post(`/posts/${ payload.id }`, {option: payload.option})
        ).map(res => postsActions.votePostSuccess(res.data)),
        Observable.of(push('/posts'))
      );
    });
}

export function createPost(action$) {
  return action$.ofType(actionTypes.POST_CREATE)
    .map(action => action.payload)
    .switchMap(post => {
      return Observable.merge(
        Observable.fromPromise(
          instanceAxios.post(`/posts`, post)
        ).map(res => postsActions.createPostSuccess(res.data)),
        Observable.of(push('/posts'))
      );
    });
}

export function deletePost(action$) {
  return action$.ofType(actionTypes.POST_DELETE)
    .map(action => action.payload)
    .switchMap(post => {
      return Observable.fromPromise(
        instanceAxios.delete(`/posts/${post.id}`)
      ).map(res => postsActions.deletePostSuccess(post));
    });
}
