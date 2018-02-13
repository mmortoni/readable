export function getParams(state) {
  return state.comments.params;
}

export function getSort(state) {
  return state.comments.sort;
}

export function getComment(state, id) {
  return state.comments.byId.find(comment => comment.id === id);
}

export function getComments(state) {
  return Object.values(state.comments.byId);
}
