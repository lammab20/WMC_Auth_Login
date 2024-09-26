import React, { useState } from 'react';
import { login } from '../api/api';
import { useNavigate } from 'react-router-dom';

interface LoginPageProps {
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const LoginPage: React.FC<LoginPageProps> = ({ setAccessToken }) => {
  const [username, setUsername] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { accessToken } = await login(username);
      setAccessToken(accessToken);
      setError(null);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Login fehlgeschlagen. Bitte versuche es erneut.');
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded">
          {error}
        </div>
      )}
      <div className="w-full max-w-sm">
        <label htmlFor="username" className="block text-gray-700 mb-2">
          Benutzername
        </label>
        <input
          type="text"
          id="username"
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Benutzername eingeben"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
