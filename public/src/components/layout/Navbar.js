import React, { Component } from "react";
import logo from "../../img/Main Logo-color.png";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <nav id="header" class="fixed w-full z-30 top-0 text-white">
        <div class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
          <div class="pl-4 flex items-center">
            <Link
              to="/"
              className="toggleColour text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
            >
              <img
                src={logo}
                className="h-16 fill-current inline"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512.005 512.005"
              />
            </Link>
          </div>
          <div className="block lg:hidden pr-4">
            <button
              id="nav-toggle"
              class="flex items-center p-1 text-pink-800 hover:text-gray-900 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
            >
              <svg
                className="fill-current h-6 w-6"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>BUILT Chicago</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
          <div
            className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20"
            id="nav-content"
          >
            <ul className="list-reset lg:flex justify-end flex-1 items-center">
              <li
                id="navAction"
                className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
              >
                <Link className="" to="/login">
                  Login
                </Link>
              </li>

              <li className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                <Link className="" to="/register">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <hr class="border-b border-gray-100 opacity-25 my-0 py-0" />
      </nav>
    );
  }
}

export default Navbar;
