// frontend/components/TimesheetForm.js
import React, { useState } from 'react';
import { postTimesheet } from '../utils/api';

const TimesheetForm = ({ setSuggestions }) => {
  const [formData, setFormData] = useState({
    project: '',
    task: '',
    hours: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call API to log timesheet
    await postTimesheet(formData);
    // Fetch suggestions after logging timesheet
    const suggestions = await fetchSuggestions();
    setSuggestions(suggestions);
  };

  const fetchSuggestions = async () => {
    // Call API to fetch suggestions
    const response = await fetch('/api/timesheets/suggestions');
    const data = await response.json();
    return data.suggestions;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="project" placeholder="Project" onChange={handleChange} />
      <input type="text" name="task" placeholder="Task" onChange={handleChange} />
      <input type="number" name="hours" placeholder="Hours" onChange={handleChange} />
      <button type="submit">Log Timesheet</button>
    </form>
  );
};

export default TimesheetForm;
