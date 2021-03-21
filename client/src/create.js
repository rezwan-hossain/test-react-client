import React, { useState } from "react";
import axios from "axios";
import Nav from "./nav";

function Create() {
  const [state, setState] = useState({
    title: "",
    content: "",
    user: "",
  });

  const { title, content, user } = state;

  const handleChange = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API}/users`, { title, content, user })
      .then((response) => {
        console.log(response);

        setState({ ...state, title: "", content: "", user: "" });
        alert("post succenfull");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <Nav />
      {JSON.stringify(state)}
      <form onSubmit={handleSubmit}>
        <div className="heading text-center font-bold text-2xl m-5 text-gray-800">
          New Post
        </div>

        <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
          <div className="form-group from-controle title bg-gray-100 border border-gray-300 p-2 mt-4  mb-4 outline-none">
            <input
              className=" from-controle border border-gray-300 outline-none"
              onChange={handleChange("title")}
              value={title}
              type="text"
              placeholder="title name"
              required
            />
          </div>
          <div className="form-group from-controle title bg-gray-100 border border-gray-300 p-2 mt-4  mb-4 outline-none">
            <textarea
              className="from-controle description bg-gray-100 sec p-3 h-40 border border-gray-300 outline-none"
              onChange={handleChange("content")}
              value={content}
              type="text"
              placeholder="content"
              required
            />
          </div>
          <div className="form-group from-controle title bg-gray-100 border border-gray-300 p-2 mt-4  mb-4 outline-none">
            <input
              className="from-controle title bg-gray-100 border border-gray-300 p-2 mt-4  mb-4 outline-none"
              onChange={handleChange("user")}
              value={user}
              type="text"
              placeholder="user name"
              required
            />
          </div>
          <div class="buttons flex">
            <div class="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto">
              Cancel
            </div>
            <div>
              <button type="submit">submit</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Create;
