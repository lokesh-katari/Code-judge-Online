import { Link } from "react-router-dom";
import React from "react";

const ErrorPage = () => {
  return (
    <div className="py-10 h-screen">
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600 ">
          Sorry, we couldn&apos:t find the page you&apos;re looking for.
        </p>
        <div className="flex items-center justify-center mt-6 gap-x-3">
          <button className="inline-flex items-center rounded-md border border-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-black ">
            <Link to="../">Take me back</Link>
          </button>

          <button className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500 ">
            <Link to="/">Go Home</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
