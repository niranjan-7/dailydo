import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    stars: 3
  });

  const handleChange = (event:any) => {
    const { name, value } = event.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event:any) => {
    event.preventDefault();
    try {
      const response = await fetch('/submit_feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        console.log("Feedback submitted successfully!");
        setFormData({name:"",email:"",stars:3})
      } else {
        console.error("Failed to submit feedback.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div className="feedback-form">
      <h2>Give Us Your Feedback</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="stars">Rating (1-5):</label>
          <select 
            id="stars" 
            name="stars" 
            value={formData.stars} 
            onChange={handleChange}
          >
            {[1, 2, 3, 4, 5].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>

        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
}

export default App;
