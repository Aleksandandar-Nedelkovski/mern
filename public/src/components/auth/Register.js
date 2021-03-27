import React, { Component } from "react";
import { Link } from "react-router-dom";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
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
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };
    console.log(newUser);
  }

  render() {
    return (
      <div className="pt-10">
        <div className="container mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left"></div>
          <div className="w-full md:w-3/5 py-6 text-center">
            <div className="bg-grey-lighter min-h-screen flex flex-col">
              <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                  <h1 className="mb-4 text-3xl text-center">Sign up</h1>
                  <p className="mb-4 text-center">Create your BUILT account</p>
                  <form onSubmit={this.onSubmit}>
                    <input
                      type="text"
                      className="block border border-grey-light w-full p-3 rounded mb-4"
                      name="name"
                      placeholder="Name"
                      value={this.state.name}
                      onChange={this.onChange.bind(this)}
                    />
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
                      type="password"
                      className="block border border-grey-light w-full p-3 rounded mb-4"
                      name="password2"
                      placeholder="Confirm Password"
                      value={this.state.password2}
                      onChange={this.onChange}
                    />

                    <input
                      type="submit"
                      className="w-full text-center py-3 rounded bg-green text-black hover:bg-green-dark focus:outline-none my-1"
                    />
                  </form>
                </div>
                <div className="text-grey-dark mt-6">
                  Already have an account?{" "}
                  <Link
                    className="no-underline border-b border-blue text-blue"
                    to="/login"
                  >
                    Log in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
