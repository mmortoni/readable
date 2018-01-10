import Immutable from 'seamless-immutable'
import * as actionTypes from './actionTypes'

const initialState = Immutable({
  byId: {},
  params: {},
  sort: {}
})
/*
const postReducer = (state, action) => {
	switch (action.type) {
		case 'postVote':
			return Object.assign(
				[...state], 
				{ [action.index]: Object.assign({}, state[action.index], {voteScore: action.voteScore}) }
			)
	}
}
*/
export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POST_FETCH_ONE_SUCCESS:
    case actionTypes.POST_FETCH_COLLECTION_SUCCESS:
      return state.merge({
        sort: action.payload.sort || {},
        params: action.payload.params || {},
        byId: action.payload.byId || {}
      })
    case actionTypes.POST_CREATE_SUCCESS:
    case actionTypes.POST_UPDATE_SUCCESS:
      return state.setIn(['byId', action.payload.id], action.payload)
    case actionTypes.POST_VOTE_SUCCESS:
      let  newById =  state.byId.map(post =>
        post.id === action.payload.id
          ? { ...post, voteScore: action.payload.voteScore }
          : post
      )

      newById = _.orderBy(newById, state.sort.sortKey, state.sort.sortOrder)

      return state.merge({
        sort: state.sort || {},
        params: state.params || {},
        byId: newById || {}
      })
    case actionTypes.POST_DELETE_SUCCESS:
      return state.set('byId', state.byId.without(action.payload.id));
    case actionTypes.POST_SORT_SUCESS:
      return state.merge({
        sort: action.payload.sort || {},
        params: action.payload.params || {},
        byId: action.payload.byId || {}
      })
    default:
      return state;
  }
};
