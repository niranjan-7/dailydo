// frontend/components/Suggestions.js
import React from 'react';

const Suggestions = ({ suggestions }) => {
  return (
    <div>
      <h2>Suggestions</h2>
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index}>{suggestion}</li>
        ))}
      </ul>
    </div>
  );
};

export default Suggestions;
