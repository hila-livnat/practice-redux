import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Users } from './components/Users';
import { SimpleUser } from './components/SimpleUser';

function App() {
  return (
    <div className="App">
      {/* <Users /> */}
      <SimpleUser />
    </div>
  );
}

export default App;
