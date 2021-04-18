import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Link
      to="/"
      className="text-black no-underline hover:no-underline lg:text-2xl"
    >
      <i className="fas fa-arrow-alt-circle-up" />
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="container">
        <div className="w-full flex flex-col md:flex-row py-6">
          <div className="flex-1 text-black">
            Copyright &copy; {new Date().getUTCFullYear()} BUILT
          </div>
          <ScrollToTopOnMount />
        </div>
      </div>
    </footer>
  );
}
