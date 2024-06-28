const Footer = () => {
  return (
    <footer className="p-4 bg-gray-200 dark:bg-gray-800 text-center text-gray-600 dark:text-gray-400 fixed bottom-0 left-0 right-0">
      &copy; {new Date().getFullYear()} AIFans. All rights reserved.
    </footer>
  );
};

export default Footer;
