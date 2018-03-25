import React from 'react';
import PropTypes from 'prop-types'
import { CommentsListRow } from './CommentsListRow';

const CommentsList = ({ comments, onDelete, onVoteComment }) => {
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

CommentsList.prototype = {
  comments: PropTypes.arrayOf(PropTypes.object),
  onDelete: PropTypes.func.isRequired,
  onVoteComment: PropTypes.func.isRequired
}

export { CommentsList }