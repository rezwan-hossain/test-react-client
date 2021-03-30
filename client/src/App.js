import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./tailwind.output.css";
import Button from "@material-ui/core/Button";

import Nav from "./nav";
import axios from "axios";
import { isAuthenticate } from "./utils/index";
// import store from "./app/store";

function App() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = () => {
    axios
      .get(`${process.env.REACT_APP_API}/users`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.log("some error");
      });
  };
  console.log(posts);
  useEffect(() => {
    fetchPosts();
  }, []);

  //get user info
  useEffect(() => {
    const uid = window.localStorage.getItem("id");

    if (isAuthenticate()) {
      // console.log(store.getState());
      // console.log("jwt is working");
      axios
        .get(`${process.env.REACT_APP_API}/users/${uid}`)
        .then((response) => {
          const data = response.data;
          console.log(` hello world${data}`);
        })
        .catch((error) => alert("Error loading single post"));
    } else {
      console.log("error");
    }
  }, []);

  const deletePost = (slug) => {
    axios
      .delete(`${process.env.REACT_APP_API}/users/${slug}`)
      .then((response) => {
        alert(response.data.message);
        fetchPosts();
      })
      .catch((error) => {
        alert("delete post problem deleting");
      });
  };

  return (
    <div className="App">
      <Nav />

      <br />

      {posts.map((post, i) => (
        <div key={post._id}>
          <div className="  max-w-md mx-auto flex flex-col p-6 bg-gray-100 mt-4 rounded-lg shadow-xl">
            <div className="block ml-6 pt-1">
              <h1 className="text-2xl text-blue-700 leading-tight">
                <Link to={`/post/${post.slug}`}>
                  <h2>{post.title}</h2>
                </Link>
              </h1>
              <p className="text-base text-gray-700 leading-normal">
                {post.content}
              </p>
            </div>

            <div className="ml-6 mt-4 flex flex-wrap space-x-24">
              <div className="">
                <Link
                  className="bg-transparent hover:bg-red text-red-dark font-semibold hover:text-white px-4 border border-red hover:border-transparent rounded-full mr-2 "
                  to={`/update/${post.slug}`}
                >
                  update
                </Link>
              </div>
              <div className="">
                <Button
                  variant="contained"
                  color="primary"
                  className="bg-transparent hover:bg-red text-red-dark font-semibold hover:text-white px-4 border border-red hover:border-transparent rounded-full mr-2 "
                  onClick={() => deletePost(post.slug)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>

          <div></div>
        </div>
      ))}
    </div>
  );
}

export default App;
