import React, { Component } from "react";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const userLogin = {
      email: this.state.email,
      password: this.state.password,
    };
    console.log(userLogin);
  }
  render() {
    return (
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-4 text-3xl text-center">Log In</h1>
            <form onSubmit={this.onSubmit}>
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.onChange}
              />

              <input
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.onChange}
              />

              <input
                type="submit"
                className="w-full text-center py-3 rounded bg-green text-black hover:bg-green-dark focus:outline-none my-1"
              />
            </form>
          </div>
          <div className="text-grey-dark mt-6">
            Don't have an account?{" "}
            <Link
              className="no-underline border-b border-blue text-blue"
              to="/register"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
