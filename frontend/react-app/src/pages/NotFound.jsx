import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center items-center text-center">
      <h1 className="text-9xl font-black text-blue-900">404</h1>
      <p className="text-2xl font-bold my-4">Oops! Page Not Found</p>
      <Link to="/" className="bg-blue-900 text-white px-8 py-3 rounded-xl font-bold">
        Go Back Home
      </Link>
    </section>
  );
};

export default NotFound;