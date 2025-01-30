import React, { useState } from 'react'; 
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import VerbEntry from './pages/VerbEntry';
import LookUpEntry from './pages/LookUpEntry';
import Header from './components/Header';
import Edit from './pages/Edit';
import RootEntry from './pages/RootEntry';
import ViewHome from './pages/ViewHome';
import ViewVerb from './pages/ViewVerb';
import ViewLookup from './pages/ViewLookup';
import ViewRoot from './pages/ViewRoot';
import EditLookup from './pages/EditLookup';
import EditRoot from './pages/EditRoot';
import Login from './pages/Login';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // After successful login
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  //Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
  };
  

  // Protected route to check if the user is authenticated
  const ProtectedRoute = ({ element }) => {
    if (isAuthenticated) {
      return element;
    } else {
      return <Navigate to="/" />; // Redirect to login if not authenticated
    }
  };

  return (
    <BrowserRouter>
      {/* Conditionally render Header based on authentication */}
      {isAuthenticated && <Header onLogout={handleLogout} />}
      
      <Routes>
        <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route 
          path="/home" 
          element={<ProtectedRoute element={<Home />} />} 
        />
        <Route 
          path="/verb-entry" 
          element={<ProtectedRoute element={<VerbEntry />} />} 
        />
        <Route 
          path="/lookup-entry" 
          element={<ProtectedRoute element={<LookUpEntry />} />} 
        />
        <Route 
          path="/view" 
          element={<ProtectedRoute element={<ViewHome />} />} 
        />
        <Route 
          path="/edit/:id" 
          element={<ProtectedRoute element={<Edit />} />} 
        />
        <Route 
          path="/edit/lookup/:id" 
          element={<ProtectedRoute element={<EditLookup />} />} 
        />
        <Route 
          path="/edit/root/:id" 
          element={<ProtectedRoute element={<EditRoot />} />}
        />
        <Route 
          path="/root-entry" 
          element={<ProtectedRoute element={<RootEntry />} />} 
        />
        <Route 
          path="/view/verb" 
          element={<ProtectedRoute element={<ViewVerb />} />} 
        />
        <Route 
          path="/view/root" 
          element={<ProtectedRoute element={<ViewRoot />} />}
        />
        <Route 
          path="/view/lookup" 
          element={<ProtectedRoute element={<ViewLookup />} />} 
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
