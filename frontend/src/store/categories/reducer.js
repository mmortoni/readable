import Immutable from 'seamless-immutable';
import * as actionTypes from './actionTypes';

const initialState = Immutable({
  byId: {}
});

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CATEGORY_FETCH_SUCCESS:
      return state.merge({byId: action.payload.byId});
    case actionTypes.CATEGORY_CREATE_SUCCESS:
    case actionTypes.CATEGORY_UPDATE_SUCCESS:
      return state.setIn(['byId', action.payload.id], action.payload);
    case actionTypes.CATEGORY_DELETE_SUCCESS:
      return state.set('byId', state.byId.without(action.payload));
    default:
      return state;
  }
};
