// src/components/Layout/Header.tsx

import ThemeSwitcher from './ThemeSwitcher';
import NavBar from './NavBar';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-800 fixed">
      <NavBar />
      <ThemeSwitcher />
    </header>
  );
};

export default Header;
