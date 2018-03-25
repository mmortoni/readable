import React from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import ThumbsUp from '../../images/thumbs-up.png'
import ThumbsDown from '../../images/thumbs-down.png'
import { formatTimestamp } from '../../utils/Utils'

const PostsListRow = ({ post, onDelete, onVotePost }) => {
  if (!post) {
    return <tr><td><div>404 Post Not Found!</div></td></tr>
  }

  return (
    <tr key={post.id}>
      <td>
        <div className="post">
          <div className="post-description">
            <Link to={`/posts/${post.id}/comment`}>
              <div className="post-title"><h3>{post.title}</h3></div>
            </Link>
            <div className="post-body"><p>{post.body}</p></div>
            <div className="post-likes">
              <img src={ThumbsUp} width="28" height="28" onClick={onVotePost.bind(this, post.id, "upVote")} />
              <img src={ThumbsDown} width="28" height="28" onClick={onVotePost.bind(this, post.id, "downVote")} />
            </div>
            <div className="post-likes-comments">
              {post.voteScore} votes {post.comments && post.comments.length > 0 ? post.comments.length : 0} comments
            </div>
          </div>
          <br />
          <div>
            <div className="post-author"><p><b>Category: </b> {post.category}</p></div>
            <div className="post-author"><p><b>Author: </b> {post.author}</p></div>
            <div className="post-author"><p><b>Time: </b> {formatTimestamp(post.timestamp)}</p></div>
          </div>
        </div>
      </td>
      <td>
        <div className="btn-toolbar pull-right">
          <Link to={`/posts/${post.id}/edit`} className="btn btn-primary btn-line">
            <span className="glyphicon glyphicon-edit" aria-hidden="true"></span>
            <span><strong>Edit</strong></span>
          </Link>
          <a onClick={onDelete.bind(this, post)} className="btn btn-danger btn-line">
            <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
            <span><strong>Delete</strong></span>
          </a>
        </div>
      </td>
    </tr>
  )
}

PostsListRow.prototype = {
  post: PropTypes.object,
  onDelete: PropTypes.func.isRequired,
  onVotePost: PropTypes.func.isRequired
}

export { PostsListRow }