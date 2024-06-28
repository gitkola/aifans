import ThemeSwitcher from './ThemeSwitcher';
import NavBar from './NavBar';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 w-full flex justify-between items-center bg-gray-200 dark:bg-gray-800">
      <NavBar />
      <ThemeSwitcher />
    </header>
  );
};

export default Header;
