import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import { Route, IndexRoute, Router, hashHistory, browserHistory  } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import store from './store';
import { Dashboard, PostsIndex, PostsEdit, PostsNew, PostsComment } from './containers/index';

require('./app.scss');

const history = syncHistoryWithStore(browserHistory, store)

let App = ({ children }) => {
  var activeKey = 0;
  let array_of_li =  document.querySelectorAll("ul.navbar-nav li");

  if (document.location.pathname.indexOf("posts") != -1) {
    activeKey = 1;
  }

  if (document.location.pathname.lastIndexOf("comment") != -1) {
    activeKey = 2;
  }

  if(array_of_li.length > 0) {
    for (let i = 0; i < array_of_li.length; i++) {
      if(i == activeKey)
        array_of_li[i].classList.add( 'active' );
      else
        array_of_li[i].classList.remove( 'active' );
    }
  }

  return (
    <div>
      <Navbar>
        <Nav>
          <IndexLinkContainer to="/" activeKey={activeKey}>
            <NavItem eventKey={0}>Dashboard</NavItem>
          </IndexLinkContainer>
          <LinkContainer to="/posts" activeKey={activeKey}>
            <NavItem eventKey={1}>Posts</NavItem>
          </LinkContainer>
          <LinkContainer to="/posts/0/comment" activeKey={activeKey}>
            <NavItem eventKey={2}>Comments</NavItem>
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
          <Route path="/posts/:postId/comment" component={ PostsComment } />
        </Route>
      </Router>
    </Provider>
  )
}
