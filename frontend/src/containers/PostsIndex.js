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
    super(props, context);

    this.deletePost = this.deletePost.bind(this);
    this.handleSearch = this.handleSearch.bind(this, 'title');
    this.onSortingChange = this.onSortingChange.bind(this);
  }

  componentDidMount() {
    this.fetchPosts({});
  }

  fetchPosts(params) {
    this.context.store.dispatch(postsActions.fetchPosts(params));
  }

  deletePost(post) {
    this.context.store.dispatch(postsActions.deletePost(post));
  }

  handleSearch(field, value) {
    this.fetchPosts({q: value, field: field})
  }

  onSortingChange(value){
    this.context.store.dispatch(postsActions.sortPosts({value: value, props: this.props}));
  }

  render() {
    const { sort, params, posts } = this.props;

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
            <select
              value={sort.sortKey}
              onChange={e => this.onSortingChange(e.target.value)}
            >
              <option value="title">Título</option>
              <option value="category">Categoria</option>
              <option value="author">Autor</option>
              <option value="voteScore">Like</option>
              <option value="timestamp">Data</option>
            </select>
          </div>
          <div className="col-md-2 text-right">
            <Link to="/posts/new" className="btn btn-primary a-btn-slide-text">
              <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
              <span><strong>Novo Post</strong></span>
            </Link>
          </div>
        </div>
        {posts.length > 0 &&
        <PostsList posts={posts} onDelete={this.deletePost}/>}
      </div>
    );
  }
}
