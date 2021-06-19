import { makeStyles } from "@material-ui/core";
import React from "react";
import AuthService from "../../services/auth.service";


const useStyles = makeStyles({
  root: {
    background: "#e9ecef",
    boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .5)",
    color: "black",
    padding: "10px 30px",
    margin: "20px",
    display: "flex",
    flexDirection: 'column',
  },
});

const Profile = ({ currentUser }) => {
  const user = AuthService.getCurrentUser() || currentUser;
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <header >
        <h3>
          <strong data-testid="username">{user.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {user.accessToken.substring(0, 20)} ...{" "}
        {user.accessToken.substr(user.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {user.id}
      </p>
      <p>
        <strong data-testid="email">Email:</strong> {user.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {user.roles &&
          user.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
    </div>
  );
};

export default Profile;
