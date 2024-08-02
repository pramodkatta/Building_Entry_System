import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import EntryForm from './components/EntryForm';
import ExitForm from './components/ExitForm';
import Analytics from './components/Analytics';
import './App.css';

const Home: React.FC = () => {
  return (
    <div className="home">
      <h1>Building Entry System</h1>
      <div className="buttons">
        <Link to="/entry">
          <button>Entry</button>
        </Link>
        <Link to="/exit">
          <button>Exit</button>
        </Link>
        <Link to="/analytics">
          <button>Analytics</button>
        </Link>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/entry" element={<EntryForm />} />
        <Route path="/exit" element={<ExitForm />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Router>
  );
};

export default App;
