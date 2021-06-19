import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Home from "./components/Home";
import Profile from "./components/user/Profile";
import BoardUser from "./components/user/BoardUser";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from '@material-ui/core/Container';

const App = () => {
  const useStyles = makeStyles((theme) => ({
    title: {
      flexGrow: 1,

      background: "none",
    },
    white: {
      color: "white",
      background: "none",
    },
    root: {
      "& > * + *": {
        marginLeft: theme.spacing(2),
      },
    },
  }));

  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  const classes = useStyles();
  return (
    <div className="root">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to={"/home"} className={classes.white}>
              Home
            </Link>
            {currentUser && (
              <Button color="inherit">
                <Link to={"/user"} className={classes.white}>
                  User
                </Link>
              </Button>
            )}
          </Typography>
          {currentUser ? (
            <Typography className={classes.root}>
              <Button href="#text-buttons" color="primary">
                <Link to={"/profile"} className={classes.white}>
                  {currentUser.username}
                </Link>
              </Button>
              <Button href="#text-buttons">
                <a href="/login" onClick={logOut} className={classes.white}>
                  LogOut
                </a>
              </Button>
            </Typography>
          ) : (
            <Typography>
              <Button color="inherit">
                <Link to={"/login"} className={classes.white}>
                  Login
                </Link>
              </Button>
              <Button color="inherit">
                <Link to={"/register"} className={classes.white}>
                  Register
                </Link>
              </Button>
            </Typography>
          )}
        </Toolbar>
      </AppBar>

      <Container className="container" maxWidth="md">
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/user" component={BoardUser} />
        </Switch>
      </Container>
    </div>
  );
};
export default App;
