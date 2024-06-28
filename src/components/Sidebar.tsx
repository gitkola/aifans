import React, { useState } from 'react';
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks/reduxHooks";
import { AppState } from '@/redux/store';

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { initialized, loading, error } = useAppSelector((state: AppState) => state.app);
  const { user } = useAppSelector((state: AppState) => state.user);
  const theme = useAppSelector((state) => state.theme.theme);

  const authorized = user && initialized;
  const unauthorized = !user;

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const className = "block py-2 px-4 text-lg text-gray-500 dark:text-gray-300 hover:bg-gray-600 rounded transition-colors duration-200"

  return (
    <div className="relative text-gray-700 dark:text-gray-300">
      <button
        onClick={toggleSidebar}
        className="fixed top-2 left-2 z-50 p-2 rounded-md bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out"
      >
        <MenuIcon />
      </button>
      <div className={`fixed top-0 left-0 z-49 h-full w-64 bg-gray-300 dark:bg-gray-700 transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 pt-16">
          <Link href="/" className={className}>AIFans</Link>
          {authorized && <Link href="/main" className={className}>Main</Link>}
          {authorized && <Link href="/me" className={className}>Profile</Link>}
          {authorized && <Link href="/game" className={className}>Game</Link>}
          {unauthorized && <Link href="/auth/login" className={className}>Login</Link>}
          {unauthorized && <Link href="/auth/registration" className={className}>Registration</Link>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;