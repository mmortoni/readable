import React from 'react';
import { CommentsListRow } from './CommentsListRow';

export const CommentsList = ({ comments, onDelete, onVoteComment }) => {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th colSpan={2}>{comments.length} comments:</th>
        </tr>
      </thead>
      <tbody>
        {comments.map(comment => CommentsListRow({ comment, onDelete, onVoteComment }))}
      </tbody>
    </table>
  )
};
