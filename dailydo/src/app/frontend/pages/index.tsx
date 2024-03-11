// frontend/pages/index.js
import React, { useState } from 'react';
import TimesheetForm from '../components/TimesheetForm';
import Suggestions from '../components/Suggestions';

const Home = () => {
  const [suggestions, setSuggestions] = useState([]);

  return (
    <div>
      <h1>Timesheet Logger</h1>
      <TimesheetForm setSuggestions={setSuggestions} />
      <Suggestions suggestions={suggestions} />
    </div>
  );
};

export default Home;
