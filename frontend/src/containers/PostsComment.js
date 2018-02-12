import React from 'react'
import { browserHistory } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Modal,ModalManager,Effect } from 'react-dynamic-modal'
import { CommentsList } from '../components/comments/CommentsList'
import { postsActions, postsSelectors } from '../store/posts/index'
import AppModal from '../components/shared/AppModal'
import { EFFECTS } from '../constants/constants'

import { formatTimestamp } from '../utils/Utils'

@connect(
  (state, props) => {
    return {
      post: postsSelectors.getPost(state, props.params.postId),
      //posts: postsSelectors.getPosts(state),
    };
  }
)

export class PostsComment extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object,
    store: React.PropTypes.object,
  };

  static propTypes = {
    params: React.PropTypes.object,
    post: React.PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
/*
    this.state = {
      ...this.state,
      postId: this.props.params.postId,
      post: this.props.post
    };
  */
  }

  componentDidMount() {
    this.fetchPosts({})
  }

  fetchPosts(params) {
    this.context.store.dispatch(postsActions.fetchPosts(params))
  }

  deletePost(item, buttonValue){
    if(buttonValue === 'ok')
      this.context.store.dispatch(postsActions.deletePost(item))
  }

  deleteCommentModal(post) {
    ModalManager.open(<AppModal
                        title={ 'Delete Post' }
                        content={ 'Tem certeza de que deseja excluir?' }
                        detail={ post.title }
                        callBackFunction={ this.deletePost }
                        item={ post }
                        effect={ EFFECTS['3D ROTATE LEFT'] } />);
  }

  votePost(id, option){
    this.context.store.dispatch(postsActions.votePost({id: id, option: option}))
    browserHistory.push('/posts');
  }
    
  handleSearch(field, value) {
    this.fetchPosts({q: value, field: field})
  }

  onSortingChange(value){
    this.sortParams.sortKey = value
    this.context.store.dispatch(postsActions.sortPosts({ sort: this.sortParams, props: this.props }))
  }

  render() {
    const post = this.props.post
    const postId = this.props.params.postId

    return (
      <div>
        <div className="row">
          <div className="col-md-10">
            <div className="post">
              <div className="post-description">
                <div className="post-title"><h3>{post.title}</h3></div>
                <div className="post-body"><p>{ post.body }</p></div>
                <div className="post-likes">
                  <img src='/images/thumbs-up.png' width="28" height="28" />
                  <img src='/images/thumbs-down.png' width="28" height="28" />
                </div>
                <div className="post-likes-comments">
                  { post.voteScore } votes { post.comments && post.comments.length > 0 ? post.comments.length : 0 } comments
                </div>
              </div>
              <br/>
              <div>
                <div className="post-author"><p><b>Category: </b> { post.category }</p></div>
                <div className="post-author"><p><b>Author: </b> { post.author }</p></div>
                <div className="post-author"><p><b>Time: </b> { formatTimestamp(post.timestamp) }</p></div>
              </div>          
            </div>

            
          </div>
        </div>
      </div>
    )
  }
}
