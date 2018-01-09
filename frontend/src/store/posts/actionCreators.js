import { keyBy } from 'lodash';
import * as actionTypes from './actionTypes';

export function fetchPost(payload) {
  return {type: actionTypes.POST_FETCH_ONE, payload};
}

export function fetchPostSuccess(payload) {
  const byId = {[payload.id]: payload};
  return {type: actionTypes.POST_FETCH_ONE_SUCCESS, payload: {byId}};
}

export function fetchPosts(payload) {
  return {type: actionTypes.POST_FETCH_COLLECTION, payload};
}

export function fetchPostsSuccess(posts, params, sort) {
  let byId = Object.assign({}, _(keyBy(posts[0], (post) => post.id))
            .map(function(v, k) {
              return _.merge({}, v, { key: k })
            })
            .value())

  byId = _.orderBy(byId, sort.sortKey, sort.sortOrder)

  return {type: actionTypes.POST_FETCH_COLLECTION_SUCCESS, payload: { byId, params, sort }};
}

export function createPost(payload) {
  return {type: actionTypes.POST_CREATE, payload};
}

export function createPostSuccess(payload) {
  return {type: actionTypes.POST_CREATE_SUCCESS, payload};
}

export function updatePost(payload) {
  return {type: actionTypes.POST_UPDATE, payload};
}

export function updatePostSuccess(payload) {
  return {type: actionTypes.POST_UPDATE_SUCCESS, payload};
}

export function votePost(payload) {
  return {type: actionTypes.POST_VOTE, payload};
}

export function votePostSuccess(payload) {
  return {type: actionTypes.POST_VOTE_SUCCESS, payload};
}

export function deletePost(payload) {
  return {type: actionTypes.POST_DELETE, payload};
}

export function deletePostSuccess(payload) {
  return {type: actionTypes.POST_DELETE_SUCCESS, payload};
}

export function sortPosts(payload) {
  return {type: actionTypes.POST_SORT, payload};
}

export function sortSuccess(posts, params, sort) {
  let byId = Object.assign({}, _(keyBy(posts, (post) => post.id))
            .map(function(v, k) {
              return _.merge({}, v, { key: k })
            })
            .value())

  byId = _.orderBy(byId, sort.sortKey, sort.sortOrder)

  return {type: actionTypes.POST_SORT_SUCESS, payload: { byId, params, sort }};
}
