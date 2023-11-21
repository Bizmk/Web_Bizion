import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import LoginForm from './LoginForm/LoginForm';


import Home  from './Home/Home';

import './App.css';

function App() {
  return (
    
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/home" element={<Home />} />          
        </Routes>
        
      </div>
    </Router>
    
  );
}

export default App;