import axios from 'axios';
import querystring from 'querystring';
import { Observable } from 'rxjs/Observable';

import { COMMENT } from '../../constants/constants'
import * as commentsActions from './actionCreators';

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

export function fetchComment(action$) {
  return action$.ofType(COMMENT.COMMENT_FETCH_ONE)
    .map(action => action.payload)
    .switchMap(id => {
      return Observable.fromPromise(
        instanceAxios.get(`/comments/${ id }`)
      ).map(res => commentsActions.fetchcommentsuccess(res.data));
    });
}

export function fetchComments(action$) {
  return action$.ofType(COMMENT.COMMENT_FETCH_COLLECTION)
    .map(action => action.payload)
    .switchMap(payload => {
      return Observable.fromPromise(
        instanceAxios.get(`/posts/${ payload.postId }/comments`)
      ).map(res => commentsActions.fetchCommentsSuccess({post:payload.post, comments:res.data}))
    })
}

export function sortComments(action$) {
  return action$.ofType(COMMENT.COMMENT_SORT)
    .map(action =>  commentsActions.sortSuccess(action.payload));
}

export function createComment(action$) {
  return action$.ofType(COMMENT.COMMENT_CREATE)
    .map(action => action.payload)
    .switchMap(post => {
      return Observable.merge(
        Observable.fromPromise(
          instanceAxios.post(`/comments`, {title: post.title, author: post.author, category: post.category, body: post.body})
        ).map(res => commentsActions.createcommentsuccess(res.data))
      );
    });
}

export function updateComment(action$) {
  return action$.ofType(COMMENT.COMMENT_UPDATE)
    .map(action => action.payload)
    .switchMap(post => {
      return Observable.merge(
        Observable.fromPromise(
          instanceAxios.put(`/comments/${ post.id }`, {title: post.title, body: post.body})
        ).map(res => commentsActions.updatecommentsuccess(res.data))
      );
    });
}

export function deleteComment(action$) {
  return action$.ofType(COMMENT.COMMENT_DELETE)
    .map(action => action.payload)
    .switchMap(post => {
      return Observable.fromPromise(
        instanceAxios.delete(`/comments/${comment.id}`)
      ).map(res => commentsActions.deletecommentsuccess(comment));
    });
}

export function voteComment(action$) {
  return action$.ofType(COMMENT.COMMENT_VOTE)
    .map(action => action.payload)
      .switchMap(payload => {
        return Observable.merge(
        Observable.fromPromise(
          instanceAxios.post(`/comments/${ payload.id }`, {option: payload.option})
        ).map(res => commentsActions.votecommentsuccess(res.data))
      );
    });
}
