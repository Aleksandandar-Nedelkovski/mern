import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

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
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-4 text-3xl text-center">Log In</h1>
            <form onSubmit={this.onSubmit}>
              <TextFieldGroup
                placeholder="Email"
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.onChange}
                error={errors.email}
              />

              <TextFieldGroup
                placeholder="Password"
                name="password"
                type="text"
                value={this.state.password}
                onChange={this.onChange}
                error={errors.password}
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
