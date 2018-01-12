import Immutable from 'seamless-immutable'
import * as actionTypes from './actionTypes'

const initialState = Immutable({
  byId: {},
  params: {},
  sort: {}
})

export default (state = initialState, action) => {
  let  newById
  switch (action.type) {
    case actionTypes.POST_FETCH_ONE_SUCCESS:
    case actionTypes.POST_FETCH_COLLECTION_SUCCESS:
      return state.merge({
        sort: action.payload.sort || {},
        params: action.payload.params || {},
        byId: action.payload.byId || {}
      })
    case actionTypes.POST_CREATE_SUCCESS:
      newById =  [ {
                    id: action.payload.id,
                    timestamp: action.payload.timestamp,
                    title: action.payload.title,
                    body: action.payload.body,
                    author: action.payload.author,
                    category: action.payload.category,
                    comments : action.payload.comments,
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
    case actionTypes.POST_UPDATE_SUCCESS:
      newById =  state.byId.map(post =>
        post.id === action.payload.id
          ? { ...post, title: action.payload.title, body: action.payload.body }
          : post
      )

      if(state.sort.sortKey === 'title')
        newById = _.orderBy(newById, state.sort.sortKey, state.sort.sortOrder)

      return state.merge({
        sort: state.sort || {},
        params: state.params || {},
        byId: newById || {}
      })
    case actionTypes.POST_VOTE_SUCCESS:
      newById =  state.byId.map(post =>
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
