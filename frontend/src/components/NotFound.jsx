import React from "react";
import error from "../assets/error.jpg";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="flex justify-center items-center min-h-screen text-center p-4 sm:p-6">
      <div className="flex flex-col items-center max-w-lg w-full">
        <img src={error} alt="Not Found" className="w-full max-w-md h-auto mb-6" />
        <Link 
          to="/" 
          className="text-blue-500 font-bold mt-6 px-4 py-2 border border-blue-500 rounded transition duration-300 hover:bg-blue-500 hover:text-white"
        >
          RETURN TO HOME PAGE
        </Link>
      </div>
    </section>
  );
}
