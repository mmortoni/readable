import { keyBy } from 'lodash';
import Immutable from 'seamless-immutable'

import { COMMENT } from '../../constants/constants'

const initialState = Immutable({
  byId: {},
  post: {},
  sort: { sortDesc: false, sortKey: 'timestamp', sortOrder: ['desc'] }
})

export default (state = initialState, action) => {
  let newById
  switch (action.type) {
    case COMMENT.COMMENT_FETCH_ONE_SUCCESS:
    case COMMENT.COMMENT_FETCH_COLLECTION_SUCCESS:
      newById = Object.assign({}, _(keyBy(action.payload[0], (comment) => comment.id))
        .map(function (v, k) {
          return _.merge({}, v, { key: k })
        })
        .value())

      newById = _.orderBy(newById, state.sort.sortKey, state.sort.sortOrder)

      return state.merge({
        sort: state.sort || {},
        post: action.payload.post || {},
        byId: newById || {}
      })
    case COMMENT.COMMENT_CREATE_SUCCESS:
      newById = [...state.byId,
      {
        id: action.payload.id,
        timestamp: action.payload.timestamp,
        body: action.payload.body,
        author: action.payload.author,
        parentId: action.payload.parentId,
        voteScore: action.payload.voteScore,
        deleted: action.payload.deleted,
        parentDeleted: action.payload.parentDeleted
      }
      ]

      return state.merge({
        sort: state.sort || {},
        params: state.params || {},
        byId: newById || {}
      })
    case COMMENT.COMMENT_UPDATE_SUCCESS:
      newById = state.byId.map(comment =>
        comment.id === action.payload.id
          ? { ...comment, title: action.payload.title, body: action.payload.body }
          : comment
      )

      newById = _.orderBy(newById, state.sort.sortKey, state.sort.sortOrder)

      return state.merge({
        sort: state.sort || {},
        params: state.params || {},
        byId: newById || {}
      })
    case COMMENT.COMMENT_VOTE_SUCCESS:
      newById = state.byId.map(comment =>
        comment.id === action.payload.id
          ? { ...comment, voteScore: action.payload.voteScore }
          : comment
      )

      newById = _.orderBy(newById, state.sort.sortKey, state.sort.sortOrder)

      return state.merge({
        sort: state.sort || {},
        params: state.params || {},
        byId: newById || {}
      })
    case COMMENT.COMMENT_DELETE_SUCCESS:
      newById = state.byId.filter(function (comment) {
        return comment.id !== action.payload.id;
      });

      return state.merge({
        sort: state.sort || {},
        params: state.params || {},
        byId: newById || {}
      })
    case COMMENT.COMMENT_SORT_SUCESS:
      newById = Object.assign({}, _(keyBy(state.byId, (comment) => comment.id))
        .map(function (v, k) {
          return _.merge({}, v, { key: k })
        })
        .value())

      newById = _.orderBy(newById, action.payload.sort.sortKey, action.payload.sort.sortOrder)

      return state.merge({
        sort: action.payload.sort || {},
        params: action.payload.props.params || {},
        byId: newById || {}
      })
    default:
      return state;
  }
};
