import React from "react";

// function ScrollToTopOnMount() {
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);
//   return (
//     <Link
//       to="/"
//       className="text-black no-underline hover:no-underline lg:text-2xl"
//     >
//       <i className="fas fa-arrow-alt-circle-up" />
//     </Link>
//   );
// }

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="container">
        <div className="w-full flex flex-col md:flex-row py-6">
          <div className="flex-1 text-black">
            Copyright &copy; {new Date().getUTCFullYear()} BUILT
          </div>
          {/* <ScrollToTopOnMount /> */}
          {/* <div className="flex-1 text-black"> */}
          <button className="bg-blue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1">
            <a
              href="https://www.facebook.com/HealthyKidsLab"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-facebook-f" />
            </a>
          </button>

          <button className="bg-pink-500 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1">
            <a
              href="https://www.instagram.com/uichealthykidslab/"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-instagram" />
            </a>
          </button>

          <button className="bg-gray-300 w-8 h-8 rounded-full">
            <a
              href="https://www.tiktok.com/@healthykidslab?lang=en"
              target="_blank"
              rel="noreferrer"
            >
              <img
                alt="..."
                src={require("../../img/tiktok-brands.svg").default}
                className="fab fa-tiktok"
              />
            </a>
          </button>
        </div>
        {/* </div> */}
      </div>
    </footer>
  );
}
