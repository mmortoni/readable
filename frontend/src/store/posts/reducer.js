import { keyBy } from 'lodash';
import Immutable from 'seamless-immutable'

import { POST } from '../../constants/constants'

const initialState = Immutable({
  byId: {},
  params: {},
  sort: { sortDesc: false, sortKey: 'voteScore', sortOrder: ['asc'] }
})

export default (state = initialState, action) => {
  let newById
  switch (action.type) {
    case POST.POST_FETCH_ONE_SUCCESS:
    case POST.POST_FETCH_COLLECTION_SUCCESS:
      newById = Object.assign({}, _(keyBy(action.payload[0], (post) => post.id))
        .map(function (v, k) {
          return _.merge({}, v, { key: k })
        })
        .value())

      newById = _.orderBy(newById, state.sort.sortKey, state.sort.sortOrder)

      return state.merge({
        sort: state.sort || {},
        params: action.payload.params || {},
        byId: newById || {}
      })
    case POST.POST_CREATE_SUCCESS:
      newById = [{
        id: action.payload.id,
        timestamp: action.payload.timestamp,
        title: action.payload.title,
        body: action.payload.body,
        author: action.payload.author,
        category: action.payload.category,
        comments: action.payload.comments,
        voteScore: action.payload.voteScore,
        deleted: action.payload.deleted,
        commentCount: action.payload.commentCount
      },
      ...state.byId
      ]

      newById = _.orderBy(newById, state.sort.sortKey, state.sort.sortOrder)

      return state.merge({
        sort: state.sort || {},
        params: state.params || {},
        byId: newById || {}
      })
    case POST.POST_UPDATE_SUCCESS:
      newById = state.byId.map(post =>
        post.id === action.payload.id
          ? { ...post, title: action.payload.title, body: action.payload.body }
          : post
      )

      if (state.sort.sortKey === 'title')
        newById = _.orderBy(newById, state.sort.sortKey, state.sort.sortOrder)

      return state.merge({
        sort: state.sort || {},
        params: state.params || {},
        byId: newById || {}
      })
    case POST.POST_VOTE_SUCCESS:
      newById = state.byId.map(post =>
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
    case POST.POST_DELETE_SUCCESS:
      newById = state.byId.filter(function (post) {
        return post.id !== action.payload.id;
      });

      return state.merge({
        sort: state.sort || {},
        params: state.params || {},
        byId: newById || {}
      })
    case POST.POST_SORT_SUCESS:
      newById = Object.assign({}, _(keyBy(state.byId, (post) => post.id))
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
