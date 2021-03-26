import Nav from "./Nav.js";
import NavItem from "./NavItem";

import "./App.css";

export default function App({ recipes }) {
  return (
    <Nav>
      <NavItem href="/featured" isActive>
        Featured
      </NavItem>
      <NavItem href="/popular">Popular</NavItem>
      <NavItem href="/recent">Recent</NavItem>
    </Nav>
  );
}
