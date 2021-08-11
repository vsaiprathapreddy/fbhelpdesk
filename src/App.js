import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import './App.css';
import Login from "./Login";
import HomePage from './components/HomePage';

function PrivateRoute({ children, ...rest }) {
  const token = sessionStorage.getItem('token');

  return (
    <Route
      {...rest}
      render={({ location }) =>
        token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function App() {
  const token = sessionStorage.getItem('token');

  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return (
              token ?
                <Redirect to="/dashboard" /> :
                <Redirect to="/login" />
            )
          }}
        />
        <Route path="/login">
          <Login />
        </Route>
        <PrivateRoute path="/dashboard">
          <HomePage />
        </PrivateRoute>
      </Switch>
    </Router>
  )
}

export default App;
