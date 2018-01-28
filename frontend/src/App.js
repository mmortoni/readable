import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import { Route, IndexRoute, Router, hashHistory, browserHistory  } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import store from './store';
import { Dashboard, PostsIndex, PostsEdit, PostsNew } from './containers/index';

require('./app.scss');

//const history = syncHistoryWithStore(hashHistory, store);
const history = syncHistoryWithStore(browserHistory, store);

let App = ({ children }) => {
  return (
    <div>
      <Navbar>
        <Nav>
          <IndexLinkContainer to="/">
            <NavItem>Dashboard</NavItem>
          </IndexLinkContainer>
          <LinkContainer to="/posts">
            <NavItem>Posts</NavItem>
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
          <IndexRoute component={ Dashboard } />
          <Route path="/posts" component={ PostsIndex } />
          <Route path="/posts/new" component={ PostsNew } />
          <Route path="/posts/:postId/edit" component={ PostsEdit } />
        </Route>
      </Router>
    </Provider>
  )
}
