import React, { useState } from 'react';
import axios from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const ExitForm: React.FC = () => {
  const [personId, setPersonId] = useState('');
  const [gate, setGate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.post('/exit', { personId, gate });
      setPersonId('');
      setGate('');
      alert('Exit successful');
    } catch (error) {
      console.error('Error registering exit:', error);
    }
  };

  return (
    <div className="container">
      <h2>Exit Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Person ID"
          value={personId}
          onChange={(e) => setPersonId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Gate"
          value={gate}
          onChange={(e) => setGate(e.target.value)}
        />
        <div className="button-group">
          <button type="submit">Exit</button>
          <button className="home-button" onClick={() => navigate('/')}>Home</button>
        </div>
      </form>
    </div>
  );
};

export default ExitForm;
