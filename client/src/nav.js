import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticate, removeAccessToken } from "./utils/index";
import { useHistory } from "react-router-dom";

const Nav = () => {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const history = useHistory();

  const handledLogout = (e) => {
    window.localStorage.removeItem("id");
    removeAccessToken();
    history.push("/login");
  };

  return (
    <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-indigo-500 mb-3">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <Link
            className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-white"
            to="/"
          >
            Home
          </Link>
          <button
            className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
        <div
          className={
            "lg:flex flex-grow items-center" +
            (navbarOpen ? " flex" : " hidden")
          }
          id="example-navbar-danger"
        >
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
            {isAuthenticate() ? (
              <div>
                <li className="nav-item">
                  <Link
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    to="/create"
                  >
                    Create
                  </Link>
                </li>
                <li className="">
                  {/* <a
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    href="#"
                  >
                    <button onClick={handledLogout}>log out</button>
                  </a> */}
                  <button
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    onClick={handledLogout}
                  >
                    log out
                  </button>
                </li>
              </div>
            ) : (
              <div>
                <li className="">
                  {/* <a
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    href="#"
                  >
                    <i className="fab fa-twitter text-lg leading-lg text-white opacity-75"></i>
                    <Link to="/signup">Sign up</Link>
                  </a> */}
                  <Link to="/signup">Sign up</Link>
                </li>
                <li className="nav-item">
                  {/* <a
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    href="!#"
                  >
                    <i className="fab fa-pinterest text-lg leading-lg text-white opacity-75"></i>
                    <Link to="/login">Sign in</Link>
                  </a> */}
                  <Link to="/login">Sign in</Link>
                </li>
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
