import React from 'react';
import PropTypes from 'prop-types'

import { PostsListRow } from './PostsListRow';

const PostsList = ({ posts, onDelete, onVotePost }) => {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th colSpan={2}>POSTS</th>
        </tr>
      </thead>
      <tbody>
        {posts.map(post => PostsListRow({ post, onDelete, onVotePost }))}
      </tbody>
    </table>
  )
}

PostsList.prototype = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
  onVotePost: PropTypes.func.isRequired
}

export { PostsList }