import React, { Component } from "react";

class Login extends Component {
  render() {
    return (
      <div class="pt-24">
        <div className="container mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
            <h1 className="my-4 text-5xl font-bold leading-tight">Login</h1>
          </div>
          <div class="w-full md:w-3/5 py-6 text-center"></div>
        </div>
      </div>
    );
  }
}

export default Login;
