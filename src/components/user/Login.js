import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { FormControl, makeStyles } from "@material-ui/core";
import AuthService from "../../services/auth.service";
import Alert from "@material-ui/lab/Alert";

const required = (value) => {
  if (!value) {
    return (
      <Alert severity="error" role="alert">
        This field is required!
      </Alert>
    );
  }
};

const useStyles = makeStyles({
  root: {
    margin: "0 auto",
  },
});

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          props.history.push("/user");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };
  const style = useStyles();
  return (
    <FormControl className={style.root}>
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleLogin} ref={form}>
          <div>
            <label htmlFor="username">Username</label>
            <Input
              type="text"
              data-testid="username"
              name="username"
              label="username"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              data-testid="password"
              name="password"
              label="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>

          <div>
            <button disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>

          {message && <Alert severity="error">{message}</Alert>}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </FormControl>
  );
};

export default Login;
