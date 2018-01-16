import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import { PostsList } from '../components/posts/PostsList';
import { SearchInput } from '../components/shared/SearchInput';
import { postsActions, postsSelectors } from '../store/posts/index';

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
    router: React.PropTypes.object,
    store: React.PropTypes.object,
  };

  constructor(props, context) {
    super(props, context)

    this.classNames = 'glyphicon glyphicon-sort-by-alphabet'
    this.deletePost = this.deletePost.bind(this)
    this.handleSearch = this.handleSearch.bind(this, 'title')
    this.onSortingChange = this.onSortingChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.votePost = this.votePost.bind(this)
  }

  componentDidMount() {
    this.fetchPosts({})
  }

  fetchPosts(params) {
    this.context.store.dispatch(postsActions.fetchPosts(params))
  }

  deletePost(post) {
    this.context.store.dispatch(postsActions.deletePost(post))
  }

  votePost(id, option){
    this.context.store.dispatch(postsActions.votePost({id: id, option: option}))
  }
    
  handleSearch(field, value) {
    this.fetchPosts({q: value, field: field})
  }

  onSortingChange(value){
    this.setState( (state) => update(sort, {sortKey: value}))
    console.log(this.props.sort)
    this.context.store.dispatch(postsActions.sortPosts({}))
  }

  handleClick(e) {
    e.preventDefault()

    if(e.target.value === 'DESC') {
      this.setState( (state) => update(sort, {sortDesc: false, sortOrder: ['asc']}))
      this.refs.refSpan.classList.remove('glyphicon-sort-by-alphabet-alt')
      this.refs.refSpan.classList.add('glyphicon-sort-by-alphabet')
      e.target.value = 'ASC'
    } else {
      this.setState( (state) => update(sort, {sortDesc: true, sortOrder: ['desc']}))
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
              value={ sort.sortKey }
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
              <span style={{class: this.classNames}} aria-hidden="true"></span>
              <span><strong>Novo Post</strong></span>
            </Link>
          </div>
        </div>
        {posts.length > 0 &&
        <PostsList posts={posts} onDelete={this.deletePost} onVotePost={this.votePost}/>}
      </div>
    );
  }
}
