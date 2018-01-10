export function getParams(state) {
  return state.posts.params;
}

export function getSort(state) {
  return state.posts.sort;
}

export function getPost(state, id) {
  return state.posts.byId.find(post => post.id === id);
}

export function getPosts(state) {
  return Object.values(state.posts.byId);
}
