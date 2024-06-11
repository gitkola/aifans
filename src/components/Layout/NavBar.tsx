// src/components/Layout/NavBar.tsx

import { AppState } from '@/redux/store';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const NavBar = () => {
  const isAuthenticated = useSelector((state: AppState) => state.auth.isAuthenticated);
  const className = 'mr-4 text-gray-800 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-300 hover:scale-105';
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-800">
      <Link href="/" className={`text-xl font-semibold ${className}`}>AIFans</Link>
      {isAuthenticated && <Link href="/profile" className={className}>Profile</Link>}
      {!isAuthenticated && <Link href="/login" className={className}>Login</Link>}
      {!isAuthenticated && <Link href="/registration" className={className}>Registration</Link>}
    </nav>
  );
};

export default NavBar;
