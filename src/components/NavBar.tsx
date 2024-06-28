import { AppState } from "@/redux/store";
import Link from "next/link";
import { useSelector } from "react-redux";

const NavBar = () => {
  const { initialized, loading, error } = useSelector((state: AppState) => state.app);
  const { user } = useSelector((state: AppState) => state.user);
  const className = 'mr-4 text-gray-800 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-300 hover:scale-105';
  const authorized = user && initialized;
  const unauthorized = !user;
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-800">
      <Link href="/" className={`text-xl font-semibold ${className}`}>AIFans</Link>
      {authorized && <Link href="/main" className={className}>Main</Link>}
      {authorized && <Link href="/me" className={className}>Profile</Link>}
      <Link href="/game" className={className}>Game</Link>
      {unauthorized && <Link href="/auth/login" className={className}>Login</Link>}
      {unauthorized && <Link href="/auth/registration" className={className}>Registration</Link>}
    </nav>
  );
};

export default NavBar;
