import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='bg-white border-gray-200 dark:bg-gray-900'>
      <div className='max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4'>
          <Link to='/' className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white' title='home'>
            ToDO Lists
          </Link>
        <div className='flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse'>
          <Link
          to='/create'
          title='click to create todo list'
            className='text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Create 
          </Link>
        </div>
        
      </div>
    </nav>
  );
};

export default Navbar;
