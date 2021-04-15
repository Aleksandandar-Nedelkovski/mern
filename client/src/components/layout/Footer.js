import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="container">
        {/* <div className="w-full flex flex-col md:flex-row py-6"> */}
        <div className="flex-1 text-black">
          Copyright &copy; {new Date().getUTCFullYear()} BUILT
        </div>
        <div className="flex-1 mb-4 text-black">
          <Link
            to="/"
            className="text-black no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
          >
            To top
          </Link>
        </div>
      </div>
    </footer>
  );
}
