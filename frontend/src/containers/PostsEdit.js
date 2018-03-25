import React from 'react';
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router';
import Textarea from 'react-textarea-autosize';
import { postsActions, postsSelectors } from '../store/posts/index';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

@connect(
  (state, props) => {
    return {
      post: postsSelectors.getPost(state, props.params.postId),
    };
  }
)

export class PostsEdit extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
    store: PropTypes.object
  };

  static propTypes = {
    params: PropTypes.object,
    post: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      ...this.state,
      postId: this.props.params.postId,
      post: this.props.post
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.post, this.state.post)) {
      this.setState({ ...this.state, post: nextProps.post });
    }
  }

  handleChange(field, e) {
    const post = Object.assign({}, this.state.post, { [field]: e.target.value });
    this.setState(Object.assign({}, this.state, { post }));
  }

  handleSubmit() {
    if (this.state.postId) {
      this.context.store.dispatch(postsActions.updatePost(this.state.post));
      browserHistory.push('/');
    }
  }

  render() {
    let { title, body } = this.state.post

    return (
      <form onSubmit={this.handleSubmit.bind(this)} noValidate>
        <div className="form-group">
          <label className="label-control">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={this.handleChange.bind(this, 'title')} />
        </div>

        <div className="form-group">
          <label className="label-control">Body</label>
          <Textarea
            className="form-control"
            value={body}
            onChange={this.handleChange.bind(this, 'body')} />
        </div>

        <button type="submit" className="btn btn-default">Update Post</button>
      </form>
    );
  }
}
