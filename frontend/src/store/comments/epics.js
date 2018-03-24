import querystring from 'querystring';
import { Observable } from 'rxjs/Observable';

import { COMMENT } from '../../constants/constants'
import * as commentsActions from './actionCreators';

export function fetchComment(action$) {
  return action$.ofType(COMMENT.COMMENT_FETCH_ONE)
    .map(action => action.payload)
    .switchMap(id => {
      return Observable.fromPromise(
        instanceAxios.get(`/comments/${id}`)
      ).map(res => commentsActions.fetchcommentsuccess(res.data));
    });
}

export function fetchComments(action$) {
  return action$.ofType(COMMENT.COMMENT_FETCH_COLLECTION)
    .map(action => action.payload)
    .switchMap(post => {
      return Observable.fromPromise(
        instanceAxios.get(`/posts/${post.id}/comments`)
      ).map(res => commentsActions.fetchCommentsSuccess(res.data))
    })
}

export function sortComments(action$) {
  return action$.ofType(COMMENT.COMMENT_SORT)
    .map(action => commentsActions.sortSuccess(action.payload));
}

export function createComment(action$) {
  return action$.ofType(COMMENT.COMMENT_CREATE)
    .map(action => action.payload)
    .switchMap(payload => {
      return Observable.merge(
        Observable.fromPromise(
          instanceAxios.post(`/comments`, { author: payload.comment.author, body: payload.comment.body, parentId: payload.postId })
        ).map(res => commentsActions.createCommentSuccess(res.data))
      );
    });
}

export function updateComment(action$) {
  return action$.ofType(COMMENT.COMMENT_UPDATE)
    .map(action => action.payload)
    .switchMap(comment => {
      return Observable.merge(
        Observable.fromPromise(
          instanceAxios.put(`/comments/${comment.id}`, { author: comment.author, body: comment.body })
        ).map(res => commentsActions.updateCommentSuccess(res.data))
      );
    });
}

export function deleteComment(action$) {
  return action$.ofType(COMMENT.COMMENT_DELETE)
    .map(action => action.payload)
    .switchMap(comment => {
      return Observable.fromPromise(
        instanceAxios.delete(`/comments/${comment.id}`)
      ).map(res => commentsActions.deleteCommentSuccess(comment));
    });
}

export function voteComment(action$) {
  return action$.ofType(COMMENT.COMMENT_VOTE)
    .map(action => action.payload)
    .switchMap(payload => {
      return Observable.merge(
        Observable.fromPromise(
          instanceAxios.post(`/comments/${payload.id}`, { option: payload.option })
        ).map(res => commentsActions.voteCommentSuccess(res.data))
      );
    });
}
