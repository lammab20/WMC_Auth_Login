import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import ShowPosts from './pages/ShowPosts';

const App: React.FC = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  return (
    <BrowserRouter>
      <Navbar accessToken={accessToken} setAccessToken={setAccessToken} />
      <Routes>
        <Route
          path="/"
          element={
            accessToken ? (
              <ShowPosts accessToken={accessToken} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/login"
          element={<LoginPage setAccessToken={setAccessToken} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;