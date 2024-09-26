import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../api/api';

interface NavbarProps {
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const Navbar: React.FC<NavbarProps> = ({ accessToken, setAccessToken }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (accessToken) {
      try {
        await logout(accessToken);
        setAccessToken(null);
        navigate('/login');
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <nav className="bg-gray-800">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link className="text-white text-lg font-semibold" to="/">
          Meine App
        </Link>
        <div>
          {accessToken ? (
            <button
              className="text-white hover:text-gray-300 transition duration-200"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <Link
              className="text-white hover:text-gray-300 transition duration-200"
              to="/login"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
