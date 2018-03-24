import { COMMENT } from '../../constants/constants'

export function fetchComment(payload) {
  return { type: COMMENT.COMMENT_FETCH_ONE, payload };
}

export function fetchCommentSuccess(payload) {
  const byId = { [payload.id]: payload };
  return { type: COMMENT.COMMENT_FETCH_ONE_SUCCESS, payload: { byId } };
}

export function fetchComments(payload) {
  return { type: COMMENT.COMMENT_FETCH_COLLECTION, payload };
}

export function fetchCommentsSuccess(payload) {
  return { type: COMMENT.COMMENT_FETCH_COLLECTION_SUCCESS, payload };
}

export function createComment(payload) {
  return { type: COMMENT.COMMENT_CREATE, payload };
}

export function createCommentSuccess(payload) {
  return { type: COMMENT.COMMENT_CREATE_SUCCESS, payload };
}

export function updateComment(payload) {
  return { type: COMMENT.COMMENT_UPDATE, payload };
}

export function updateCommentSuccess(payload) {
  return { type: COMMENT.COMMENT_UPDATE_SUCCESS, payload };
}

export function voteComment(payload) {
  return { type: COMMENT.COMMENT_VOTE, payload };
}

export function voteCommentSuccess(payload) {
  return { type: COMMENT.COMMENT_VOTE_SUCCESS, payload };
}

export function deleteComment(payload) {
  return { type: COMMENT.COMMENT_DELETE, payload };
}

export function deleteCommentSuccess(payload) {
  return { type: COMMENT.COMMENT_DELETE_SUCCESS, payload };
}

export function sortComments(payload) {
  return { type: COMMENT.COMMENT_SORT, payload };
}

export function sortSuccess(payload) {
  return { type: COMMENT.COMMENT_SORT_SUCESS, payload };
}
