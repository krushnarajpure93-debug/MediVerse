import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 text-gray-900 px-4">
      <h1 className="text-[10rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 animate-bounce">
        404
      </h1>
      <h2 className="text-4xl md:text-5xl font-semibold mt-4">
        Oops! Page Not Found
      </h2>
      <p className="mt-2 text-lg md:text-xl text-gray-600 text-center max-w-md">
        Sorry, the page you are looking for might have been removed, had its
        name changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="mt-8 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg shadow-lg hover:scale-105 hover:from-purple-600 hover:to-blue-600 transition-transform duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
