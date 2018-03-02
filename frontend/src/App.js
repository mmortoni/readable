import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import { Route, IndexRoute, Router, hashHistory, browserHistory  } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import store from './store';
import { PostsIndex, PostsEdit, PostsNew, PostsComment } from './containers/index';

require('./app.scss');

const history = syncHistoryWithStore(browserHistory, store)

let App = ({ children }) => {

  return (
    <div>
      <Navbar>
        <Nav>
          <IndexLinkContainer to="/">
            <NavItem>Posts</NavItem>
          </IndexLinkContainer>
          <LinkContainer to="">
            <NavItem disabled={true}>Comments</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar>
      <div className="container">
        { children }
      </div>
    </div>
  );
}

export default () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={ App }>
          <IndexRoute path="/" component={ PostsIndex } />
          <Route path="/posts/new" component={ PostsNew } />
          <Route path="/posts/:postId/edit" component={ PostsEdit } />
          <Route path="/posts/:postId/comment" component={ PostsComment } />
        </Route>
      </Router>
    </Provider>
  )
}
