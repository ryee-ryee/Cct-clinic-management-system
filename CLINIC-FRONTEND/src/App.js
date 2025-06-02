/*import React from 'react';
import LoginPage from './components/LoginPage';

function App() {
  return (
    <div className="App">
      <LoginPage />
    </div>
  );
}

export default App;*/

import React, { useState } from "react";
import LoginPage from './components/LoginPage';
import { Home } from './components/Home';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      <Home />
    </div>
  );
}

export default App;
