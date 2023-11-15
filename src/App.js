import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import LoginForm from './LoginForm';
import CrudUsers from './CrudUsers';
import CrudUsersUpdate from './CrudUsersUpdate';
import SuccessMessage from './SuccessMessage';
import UserTable from './UserTable';

import Home  from './Home';

import './App.css';

function App() {
  return (
    
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/crud-users" element={<CrudUsers />} />
          <Route path="/crud-users-update" element={<CrudUsersUpdate />} />
          <Route path="/home" element={<Home />} />
          <Route path="/user-table" element={<UserTable />} />
          <Route path="/success" element={<SuccessMessage />} />
          
        </Routes>
        
      </div>
    </Router>
    
  );
}

export default App;