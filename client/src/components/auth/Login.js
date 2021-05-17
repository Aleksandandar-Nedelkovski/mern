import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <div className="min-h-screen flex flex-col">
        <div className="mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white rounded px-6 py-8 shadow-md">
            <h1 className="large">Sign In</h1>
            <p className="lead">
              <i className="fas fa-user" /> Sign Into Your BUILT Account
            </p>
            <form className="form" onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={onChange}
                />
              </div>
              <input type="submit" className="btn btn-orange" value="Login" />
            </form>
            <p className="my-1">
              Don't have an account?{" "}
              <Link className="text-black font-bold" to="/register">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
