import { POST } from '../../constants/constants'

export function fetchPost(payload) {
  return { type: POST.POST_FETCH_ONE, payload };
}

export function fetchPostSuccess(payload) {
  return { type: POST.POST_FETCH_ONE_SUCCESS, payload };
}

export function fetchPosts(payload) {
  return { type: POST.POST_FETCH_COLLECTION, payload };
}

export function fetchPostsSuccess(payload) {
  return { type: POST.POST_FETCH_COLLECTION_SUCCESS, payload };
}

export function createPost(payload) {
  return { type: POST.POST_CREATE, payload };
}

export function createPostSuccess(payload) {
  return { type: POST.POST_CREATE_SUCCESS, payload };
}

export function updatePost(payload) {
  return { type: POST.POST_UPDATE, payload };
}

export function updatePostSuccess(payload) {
  return { type: POST.POST_UPDATE_SUCCESS, payload };
}

export function votePost(payload) {
  return { type: POST.POST_VOTE, payload };
}

export function votePostSuccess(payload) {
  return { type: POST.POST_VOTE_SUCCESS, payload };
}

export function deletePost(payload) {
  return { type: POST.POST_DELETE, payload };
}

export function deletePostSuccess(payload) {
  return { type: POST.POST_DELETE_SUCCESS, payload };
}

export function sortPosts(payload) {
  return { type: POST.POST_SORT, payload };
}

export function sortSuccess(payload) {
  return { type: POST.POST_SORT_SUCESS, payload };
}
