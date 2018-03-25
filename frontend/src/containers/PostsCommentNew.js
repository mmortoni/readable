import React from 'react';
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router';
import Textarea from 'react-textarea-autosize';
import { commentsActions, commentsSelectors } from '../store/comments/index';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

export class PostsCommentNew extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
    store: PropTypes.object
  };

  static propTypes = {
    params: PropTypes.object,
    post: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context)

    this.state = {
      postId: this.props.params.postId,
      comment: { author: '', body: '' }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.post, this.state.comment)) {
      this.setState({ ...this.state, post: nextProps.post });
    }
  }

  handleChange(field, e) {
    const comment = Object.assign({}, this.state.comment, { [field]: e.target.value });
    this.setState(Object.assign({}, this.state, { comment }));
  }

  handleSubmit() {
    this.context.store.dispatch(commentsActions.createComment(this.state));
    browserHistory.push(`/posts/${this.state.postId}/comment`);
  }

  render() {
    let { author, body } = this.state.comment

    return (
      <form onSubmit={this.handleSubmit.bind(this)} noValidate>
        <div className="form-group">
          <label className="label-control">Autor</label>
          <input
            type="text"
            className="form-control"
            value={author}
            onChange={this.handleChange.bind(this, 'author')} />
        </div>

        <div className="form-group">
          <label className="label-control">Body</label>
          <Textarea
            className="form-control"
            value={body}
            onChange={this.handleChange.bind(this, 'body')} />
        </div>
        <button type="submit" className="btn btn-default">Create Comment</button>
      </form>
    );
  }
}
