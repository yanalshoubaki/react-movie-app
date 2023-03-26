import React from 'react';
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <nav className="w-full bg-slate-500  px-6 py-4 shadow-md">
      <div className=" w-5/6 mx-auto flex justify-between">
        <div className="flex space-x-2 items-center">
          <h1 className="text-xl font-bold text-white cursor-pointer">
            Movie App
          </h1>
        </div>
        <div className="flex space-x-10 items-center">
          <Link
            className="text-white capitalize font-bold mr-4"
            to="/"
          >
            home
          </Link>
          <Link
            className="text-white capitalize font-bold mr-4"
            to="/search"
          >
            search
          </Link>
          <Link
            className="text-white capitalize font-bold mr-4"
            to="/favourite"
          >
            favourite
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
