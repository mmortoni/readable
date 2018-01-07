import Immutable from 'seamless-immutable';
import * as actionTypes from './actionTypes';

const initialState = Immutable({
  byId: {},
  params: {},
  sort: {}
});

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POST_FETCH_ONE_SUCCESS:
    case actionTypes.POST_FETCH_COLLECTION_SUCCESS:
      return state.merge({
        sort: action.payload.sort || {},
        params: action.payload.params || {},
        byId: action.payload.byId || {}
      });
    case actionTypes.POST_CREATE_SUCCESS:
    case actionTypes.POST_UPDATE_SUCCESS:
      return state.setIn(['byId', action.payload.id], action.payload);
    case actionTypes.POST_VOTE_SUCCESS:
      return state.setIn(['byId', action.payload.id], action.payload);
    case actionTypes.POST_DELETE_SUCCESS:
      return state.set('byId', state.byId.without(action.payload.id));
    case actionTypes.POST_SORT_SUCESS:
      return state.merge({
        sort: action.payload.sort || {},
        params: action.payload.params || {},
        byId: action.payload.byId || {}
      });
    default:
      return state;
  }
};
