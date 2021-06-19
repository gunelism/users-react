import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import UserService from "../services/user.service";

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
const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  const styles = useStyles();

  return (
    <div className={styles.root}>
      <header>
        <h3>{content}</h3>
      </header>
    </div>
  );
};

export default Home;
