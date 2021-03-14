import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "./nav";
import { useHistory } from "react-router-dom";

const UpdatePost = (props) => {
  const [state, setState] = useState({
    title: "",
    content: "",
    user: "",
  });

  const { title, content, user } = state;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/users/${props.match.params.slug}`)
      .then((response) => {
        const { title, content, user } = response.data;
        setState({ title, content, user });
      })
      .catch((error) => alert("Error loading single post"));
  }, [props.match.params.slug]);

  const handleChange = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };

  const history = useHistory();

  //dwaawdawd ada wdaw dawd dawdawd
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(state);
    axios
      .put(`${process.env.REACT_APP_API}/users/${props.match.params.slug}`, {
        title,
        content,
        user,
      })
      .then((response) => {
        console.log(response);

        setState({ ...state, title: "", content: "", user: "" });
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const showUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <h1> from</h1>
      <div className="form-group">
        <label>title</label>
        <input
          onChange={handleChange("title")}
          value={title}
          type="text"
          className="from-controle"
          placeholder="title"
          required
        />
      </div>
      <div className="form-group">
        <label>content</label>
        <textarea
          onChange={handleChange("content")}
          value={content}
          type="text"
          className="from-controle"
          placeholder="content"
          required
        />
      </div>
      <div className="form-group">
        <label>user</label>
        <input
          onChange={handleChange("user")}
          value={user}
          type="text"
          className="from-controle"
          placeholder="user name"
          required
        />
      </div>

      <div>
        <button type="submit">submit</button>
      </div>
    </form>
  );

  return (
    <div className="">
      <Nav />
      <h1>Update post</h1>
      {showUpdateForm()}
    </div>
  );
};

export default UpdatePost;
