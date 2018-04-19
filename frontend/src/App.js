import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import { Route, IndexRoute, Router, hashHistory, browserHistory } from 'react-router';
import Switch from 'react-router-dom/Switch'
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import store from './store/index';
import axios from 'axios';

import { PostsIndex, PostsEdit, PostsNew, PostsComment, PostsCommentEdit, PostsCommentNew } from './containers/index';
//import NotFound from './components/NotFound/NotFound';

require('./app.scss');

const history = syncHistoryWithStore(browserHistory, store)

let token = localStorage.token;

if (!token)
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8);

window.instanceAxios = axios.create({
  baseURL: process.env.REACT_APP_READABLE_API || 'http://localhost:3030',
  timeout: 5000,
  headers: {
    'Accept': 'application/json',
    'Authorization': token,
    'Content-Type': 'application/json'
  }
})

let App = ({ children }) => {
  return (
    <div>
      <Navbar>
        <Nav>
          <IndexLinkContainer to="/">
            <NavItem >Posts</NavItem>
          </IndexLinkContainer>
          <LinkContainer to="">
            <NavItem id="navItemComments" disabled={true}>Comments</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar>
      <div className="container">
        {children}
      </div>
    </div>
  );
}

const NotFound = React.createClass({
  render() {
    return (<div>Page Not Found</div>)
  }
})

export default () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={PostsIndex} />
          <Route path="/posts/new" component={PostsNew} />
          <Route path="/posts/:postId/edit" component={PostsEdit} />
          <Route path="/posts/:postId/comment" component={PostsComment} />
          <Route path="/posts/:postId/comment/new" component={PostsCommentNew} />
          <Route path="/posts/comment/:commentId/edit" component={PostsCommentEdit} />
          <Route path='*' component={NotFound} />
        </Route>
      </Router>
    </Provider>
  )
}


