import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { registerUser } from "../../actions/authActions";

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

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
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
    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-4 text-3xl text-center">Sign up</h1>
            <p className="mb-4 text-center">Create your BUILT account</p>
            <form onSubmit={this.onSubmit}>
              {errors.name && <div className="text-red-500">{errors.name}</div>}
              <input
                type="text"
                className={classnames(
                  "block border border-grey-light w-full p-3 rounded mb-4",
                  { "border-red-500": errors.name }
                )}
                name="name"
                placeholder="Name"
                value={this.state.name}
                onChange={this.onChange.bind(this)}
              />
              {errors.email && (
                <div className="text-red-500">{errors.email}</div>
              )}
              <input
                type="text"
                className={classnames(
                  "block border border-grey-light w-full p-3 rounded mb-4",
                  { "border-red-500": errors.email }
                )}
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.onChange}
              />
              {errors.password && (
                <div className="text-red-500">{errors.password}</div>
              )}
              <input
                type="password"
                className={classnames(
                  "block border border-grey-light w-full p-3 rounded mb-4",
                  { "border-red-500": errors.password }
                )}
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.onChange}
              />
              {errors.password2 && (
                <div className="text-red-500">{errors.password2}</div>
              )}
              <input
                type="password"
                className={classnames(
                  "block border border-grey-light w-full p-3 rounded mb-4",
                  { "border-red-500": errors.password2 }
                )}
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
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
