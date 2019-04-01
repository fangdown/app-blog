import React from 'react';
import {
  Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import createHistory from 'history/createHashHistory';
import Main from '@main/Main.jsx';
import Login from '@modules/login/Login';
import NotFound from '@modules/404/NotFound';

const history = createHistory();
class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/404" component={NotFound} />
          <Route path="/" component={Main} />
          <Redirect to="/" />
        </Switch>
      </Router>
    );
  }
}
export default App;

