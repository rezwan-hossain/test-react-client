import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "./nav";

const SinglePost = (props) => {
  const [post, setPost] = useState("");

  useEffect(() => {
    console.log(props.match.params.slug);
    axios
      .get(`${process.env.REACT_APP_API}/users/post/${props.match.params.slug}`)
      .then((response) => setPost(response.data))
      .catch((error) => alert("Error loading single post"));
  }, [props.match.params.slug]);

  return (
    <div className="container pb-5">
      <Nav />
      <br />
      <h1>{post.title}</h1>
      <p className="lead">{post.content}</p>
      <p>
        Author <span className="badge">{post.user}</span> Published on{" "}
        <span className="badge">
          {new Date(post.createdAt).toLocaleString()}
        </span>
      </p>
    </div>
  );
};

export default SinglePost;
