import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="create">Create</Link>
        </li>
        <li>
          <Link to="signup">Sign up</Link>
        </li>
        <li>
          <Link to="login">Sign in</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
