import React from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Modal, ModalManager, Effect } from 'react-dynamic-modal'
import { PostsList } from '../components/posts/PostsList'
import { SearchInput } from '../components/shared/SearchInput'
import { postsActions, postsSelectors } from '../store/posts/index'
import AppModal from '../components/shared/AppModal'
import { EFFECTS } from '../constants/constants'

@connect(
  (state) => {
    return {
      sort: postsSelectors.getSort(state),
      params: postsSelectors.getParams(state),
      posts: postsSelectors.getPosts(state),
    };
  }
)

export class PostsIndex extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
    store: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context)

    this.sortParams = { sortDesc: props.sort.sortDesc, sortKey: props.sort.sortKey, sortOrder: [] }
    this.classNames = 'glyphicon glyphicon-sort-by-alphabet'
    this.deletePost = this.deletePost.bind(this)
    this.deletePostModal = this.deletePostModal.bind(this)
    this.handleSearch = this.handleSearch.bind(this, 'title')
    this.onSortingChange = this.onSortingChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.votePost = this.votePost.bind(this)
  }

  componentDidMount() {
    document.getElementById('navItemComments').parentNode.classList.add('disabled')

    this.fetchPosts({})
  }

  fetchPosts(params) {
    this.context.store.dispatch(postsActions.fetchPosts(params))
  }

  deletePost(item, buttonValue) {
    if (buttonValue === 'ok')
      this.context.store.dispatch(postsActions.deletePost(item))
  }

  deletePostModal(post) {
    ModalManager.open(<AppModal
      title={'Delete Post'}
      content={'Tem certeza de que deseja excluir?'}
      detail={post.title}
      callBackFunction={this.deletePost}
      item={post}
      effect={EFFECTS['3D ROTATE LEFT']} />);
  }

  votePost(id, option) {
    this.context.store.dispatch(postsActions.votePost({ id: id, option: option }))
  }

  handleSearch(field, value) {
    let p = {}

    if (value !== null && value.trim().length > 0)
      p = { q: value.trim(), field: field }

    this.fetchPosts(p)
  }

  onSortingChange(value) {
    this.sortParams.sortKey = value
    this.context.store.dispatch(postsActions.sortPosts({ sort: this.sortParams, props: this.props }))
  }

  handleClick(e) {
    e.preventDefault()
    this.sortParams.sortDesc = !this.sortParams.sortDesc
    this.sortParams.sortOrder[0] = (this.sortParams.sortDesc ? 'desc' : 'asc')

    if (e.target.value === 'DESC') {
      this.refs.refSpan.classList.remove('glyphicon-sort-by-alphabet-alt')
      this.refs.refSpan.classList.add('glyphicon-sort-by-alphabet')
      e.target.value = 'ASC'
    } else {
      this.refs.refSpan.classList.remove('glyphicon-sort-by-alphabet')
      this.refs.refSpan.classList.add('glyphicon-sort-by-alphabet-alt')
      e.target.value = 'DESC'
    }

    this.onSortingChange(this.refs.refSelect.value)

    return false
  }

  render() {
    const { sort, params, posts } = this.props

    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <SearchInput
              value={params.q}
              onSearch={this.handleSearch}
              placeholder="Pesquisa de título..."
            />
          </div>
          <div className="col-md-4">
            Ordenar por:&nbsp;
            <select ref="refSelect"
              value={sort.sortKey}
              onChange={e => this.onSortingChange(e.target.value)}
            >
              <option value="title">Título</option>
              <option value="category">Categoria</option>
              <option value="author">Autor</option>
              <option value="voteScore">Like</option>
              <option value="timestamp">Data</option>
            </select>&nbsp;
            <div className="btn-group btn-toggle vcenter">
              <button className="btn btn-md btn-default active" value="ASC" onClick={e => this.handleClick(e)}>
                <span ref="refSpan" className="glyphicon glyphicon-sort-by-alphabet" aria-hidden="true"></span>
              </button>
            </div>
          </div>
          <div className="col-md-2 text-right">
            <Link to="/posts/new" className="btn btn-primary a-btn-slide-text">
              <span style={{ class: this.classNames }} aria-hidden="true"></span>
              <span><strong>Novo Post</strong></span>
            </Link>
          </div>
        </div>
        {posts.length > 0 &&
          <PostsList posts={posts} onDelete={this.deletePostModal} onVotePost={this.votePost} />}
      </div>
    );
  }
}
