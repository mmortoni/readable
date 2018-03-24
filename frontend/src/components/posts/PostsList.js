import React from 'react';
import { PostsListRow } from './PostsListRow';

export const PostsList = ({ posts, onDelete, onVotePost }) => {
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
};
