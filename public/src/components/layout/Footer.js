import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer classNameName="bg-white">
      <div className="container mx-auto px-8">
        <div className="w-full flex flex-col md:flex-row py-6">
          <div className="flex-1 mb-6 text-white">
            Copyright &copy; {new Date().getUTCFullYear()} BUILT
          </div>
          <Link
            to="/"
            className="no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
          >
            link
          </Link>
        </div>
      </div>
    </footer>
  );
}
