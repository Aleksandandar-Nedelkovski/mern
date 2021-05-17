/*eslint-disable*/
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../actions/auth";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import logo from "../../img/logo-white.png";

const AuthNavbar = ({ auth: { isAuthenticated, user }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">
          <i className="fas fa-users" />{" "}
          <span className="hide-sm">Parents</span>
        </Link>
      </li>
      <li>
        <Link to="/posts">
          <i className="fas fa-comment-dots" />{" "}
          <span className="hide-sm">Posts</span>
        </Link>
      </li>
      <li>
        <Link to="/prize-store">
          <i className="fas fa-shopping-cart" />{" "}
          <span className="hide-sm">Prize Store</span>
        </Link>
      </li>
      <li>
        <Link to="/events">
          <i className="fas fa-calendar-week" />{" "}
          <span className="hide-sm">Events</span>
        </Link>
      </li>
      <li>
        <Link to="/home-challenges">
          <i className="fas fa-running" />{" "}
          <span className="hide-sm">Home Challenges</span>
        </Link>
      </li>
      <li>
        <Link to={"/profile"}>
          <i className="fas fa-user" />
          <span className="hide-sm">Profile</span>
        </Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-address-card" />{" "}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/contact">Contact</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <img className="logo" src={logo} alt="logo" />
        </Link>
      </h1>
      <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
    </nav>
  );
};

AuthNavbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(AuthNavbar);
