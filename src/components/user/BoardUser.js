import { makeStyles } from "@material-ui/core";
import React, { useState, useEffect } from "react";

import UserService from "../../services/user.service";

const useStyles = makeStyles({
  root: {
    background: "#e9ecef",
    boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .5)",
    color: "black",
    height: "50px",
    padding: "10px 30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "20px auto",
  },
});

const BoardUser = ({ contentProp }) => {
  const [content, setContent] = useState(contentProp);
  const styles = useStyles();
  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className={styles.root}>
      <header>
        <h3 data-testid="content">{content}</h3>
        <p>Welcome!</p>
      </header>
    </div>
  );
};

export default BoardUser;
