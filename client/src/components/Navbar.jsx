import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container-custom py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-dark">
          DevCollab
        </Link>
        <div className="flex space-x-6">
          <Link to="/project/create" className="text-dark hover:text-primary transition-colors">
            Create Project
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
