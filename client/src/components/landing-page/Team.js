import React from "react";

export default function Team() {
  return (
    <>
      <section className="pt-20 pb-48">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center text-center mb-24">
            <div className="w-full lg:w-6/12 px-4">
              <h2 className="text-4xl font-semibold">Here are our heroes</h2>
              <p className="text-lg leading-relaxed m-4 text-blueGray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur enim et rerum, debitis repellat excepturi in iure
                unde quia ad molestiae ratione hic nobis eveniet, voluptas ipsum
                explicabo minus dignissimos.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
              <div className="px-6">
                <img
                  alt="..."
                  src={
                    require("../../img/Characters/Characters-07.jpg").default
                  }
                  className="shadow-lg rounded-full mx-auto max-w-120-px"
                />
                <div className="pt-6 text-center">
                  <h5 className="text-xl font-bold">Eddie Bustamente</h5>
                  <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                    Director
                  </p>
                  <div className="mt-6">
                    <button
                      className="bg-lightBlue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i className="fab fa-twitter"></i>
                    </button>
                    <button
                      className="bg-lightBlue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i className="fab fa-facebook-f"></i>
                    </button>
                    <button
                      className="bg-pink-500 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i className="fab fa-dribbble"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
              <div className="px-6">
                <img
                  alt="..."
                  src={
                    require("../../img/Characters/Characters-08.jpg").default
                  }
                  className="shadow-lg rounded-full mx-auto max-w-120-px"
                />
                <div className="pt-6 text-center">
                  <h5 className="text-xl font-bold">Jared Ramer</h5>
                  <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                    Assistant
                  </p>
                  <div className="mt-6">
                    <button
                      className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i className="fab fa-google"></i>
                    </button>
                    <button
                      className="bg-lightBlue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i className="fab fa-facebook-f"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
              <div className="px-6">
                <img
                  alt="..."
                  src={
                    require("../../img/Characters/Characters-09.jpg").default
                  }
                  className="shadow-lg rounded-full mx-auto max-w-120-px"
                />
                <div className="pt-6 text-center">
                  <h5 className="text-xl font-bold">Alexa Smith</h5>
                  <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                    UI/UX Designer
                  </p>
                  <div className="mt-6">
                    <button
                      className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i className="fab fa-google"></i>
                    </button>
                    <button
                      className="bg-lightBlue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i className="fab fa-twitter"></i>
                    </button>
                    <button
                      className="bg-blueGray-700 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i className="fab fa-instagram"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
              <div className="px-6">
                <img
                  alt="..."
                  src={
                    require("../../img/Characters/Characters-10.jpg").default
                  }
                  className="shadow-lg rounded-full mx-auto max-w-120-px"
                />
                <div className="pt-6 text-center">
                  <h5 className="text-xl font-bold">Jenna Kardi</h5>
                  <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                    Founder and CEO
                  </p>
                  <div className="mt-6">
                    <button
                      className="bg-pink-500 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i className="fab fa-dribbble"></i>
                    </button>
                    <button
                      className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i className="fab fa-google"></i>
                    </button>
                    <button
                      className="bg-lightBlue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i className="fab fa-twitter"></i>
                    </button>
                    <button
                      className="bg-blueGray-700 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i className="fab fa-instagram"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
