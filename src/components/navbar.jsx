import React, { useState } from "react";
import { jwtDecode } from 'jwt-decode'
import { Menu } from '@headlessui/react';
import { Navigate } from 'react-router-dom';
import { token } from "../api/client"

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = jwtDecode(token);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(true);
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
        
            <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500" aria-controls="mobile-menu" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed. */}
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
              {/* Icon when menu is open. */}
              <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <img className="h-8 w-8 mr-2" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow" />
              <span className="text-gray-800 text-lg font-semibold hidden sm:block">VichyBlog</span>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <a href="/Home" className="text-gray-800 hover:bg-gray-100 hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium">Inicio</a>
                <a href="/about" className="text-gray-800 hover:bg-gray-100 hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium">Acerca de</a>
                <a href="/Publishes" className="text-gray-800 hover:bg-gray-100 hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium">Mis publicaciones</a>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Menu as="div" className="ml-3 relative">
              <div>
                <Menu.Button className="bg-white flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <span className="sr-only">Open user menu</span>
                  <img className="h-8 w-8 rounded-full" src={user._img} alt="" />
                </Menu.Button>
              </div>
              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700'
                        )}
                        onClick={handleLogout}
                      >
                        Salir
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700'
                        )}
                      >
                        Profile
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Menu>
          </div>
        </div>
      </div>

      <div className="sm:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <a href="/Home" className="text-gray-800 hover:bg-gray-100 hover:text-gray-500 block px-3 py-2 rounded-md text-base font-medium">Inicio</a>
          <a href="/about" className="text-gray-800 hover:bg-gray-100 hover:text-gray-500 block px-3 py-2 rounded-md text-base font-medium">Acerca de</a>
          <a href="/Publishes" className="text-gray-800 hover:bg-gray-100 hover:text-gray-500 block px-3 py-2 rounded-md text-base font-medium">Mis publicaciones</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

