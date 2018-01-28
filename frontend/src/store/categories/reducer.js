import { keyBy, without } from 'lodash';
import Immutable from 'seamless-immutable';
import * as actionTypes from './actionTypes';

const initialState = Immutable({
  byId: {}
});

export default (state = initialState, action) => {
  let  newById

  switch (action.type) {
    case actionTypes.CATEGORY_FETCH_COLLECTION_SUCCESS:
      newById = Object.assign({}, _(keyBy(action.data, (category) => category.id))
      .map(function(v, k) {
        return _.merge({}, v, { key: k })
      })
      .value())

      return state.merge({
        post: action.payload.post || {},
        byId: newById || {}
      })
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
