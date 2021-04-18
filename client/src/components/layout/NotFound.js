import React, { Fragment } from "react";

const NotFound = () => {
  return (
    <Fragment>
      <div className="min-h-screen flex flex-col">
        <div className="mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white rounded px-6 py-8 shadow-md">
            <h1 className="x-large text-center">
              <i className="fas fa-exclamation-triangle" /> Page Not Found
            </h1>
            <p className="large">Sorry, this page does not exist</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default NotFound;
