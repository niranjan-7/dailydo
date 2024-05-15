import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const FeedbackApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const FeedbackForm = styled.div`
  margin-bottom: 20px;
`;

const FormField = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.label`
  margin-right: 5px;
`;

const Input = styled.input`
  padding: 5px;
  border-radius: 3px;
  border: 1px solid #ccc;
  width: 200px;
`;

const Select = styled.select`
  padding: 5px;
  border-radius: 3px;
  border: 1px solid #ccc;
  width: 200px;
`;

const Button = styled.button`
  padding: 5px 10px;
  border-radius: 3px;
  border: none;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  margin-right: 5px;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  background-color: #f2f2f2;
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`;

function App() {
 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    stars: 3
  });
  const [feedbacks, setFeedbacks] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch('/feedback_list');
      if (response.ok) {
        const feedbackList = await response.json();
        setFeedbacks(feedbackList);
      } else {
        console.error("Failed to fetch feedbacks.");
      }
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

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
        setFormData({ name: "", email: "", stars: 3 });
        fetchFeedbacks();
      } else {
        console.error("Failed to submit feedback.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  const handleEdit = (id:any) => {
    const feedbackToEdit:any = feedbacks.find((feedback:any) => feedback.id === id);
    setFormData({
      name: feedbackToEdit.name,
      email: feedbackToEdit.email,
      stars: feedbackToEdit.stars
    });
    setEditingId(id);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/update_feedback/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        console.log("Feedback updated successfully!");
        setFormData({ name: "", email: "", stars: 3 });
        setEditingId(null);
        fetchFeedbacks();
      } else {
        console.error("Failed to update feedback.");
      }
    } catch (error) {
      console.error("Error updating feedback:", error);
    }
  };

  const handleCancelEdit = () => {
    setFormData({ name: "", email: "", stars: 3 });
    setEditingId(null);
  };

  const handleDelete = async (id:any) => {
    try {
      const response = await fetch(`/delete_feedback/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        console.log("Feedback deleted successfully!");
        fetchFeedbacks();
      } else {
        console.error("Failed to delete feedback.");
      }
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  return (
    <FeedbackApp className="feedback-app">
      <FeedbackForm className="feedback-form">
        <h2>{editingId ? 'Edit Feedback' : 'Give Us Your Feedback'}</h2>
        <form onSubmit={handleSubmit}>
          <FormField>
            <Label htmlFor="name">Name:</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormField>

          <FormField>
            <Label htmlFor="email">Email:</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormField>

          <FormField>
            <Label htmlFor="stars">Rating (1-5):</Label>
            <Select
              id="stars"
              name="stars"
              value={formData.stars}
              onChange={handleChange}
            >
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </Select>
          </FormField>

          {editingId ? (
            <div>
              <Button type="button" onClick={handleUpdate}>Update Feedback</Button>
              <Button type="button" onClick={handleCancelEdit}>Cancel</Button>
            </div>
          ) : (
            <Button type="submit">Submit Feedback</Button>
          )}
        </form>
      </FeedbackForm>

      <div className="feedback-list">
        <h2>Feedback List</h2>
        <Table>
          <thead>
            <tr>
              <TableHeader>Name</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader>Stars</TableHeader>
              <TableHeader>Action</TableHeader>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback:any) => (
              <tr key={feedback.id}>
                <TableCell>{feedback.name}</TableCell>
                <TableCell>{feedback.email}</TableCell>
                <TableCell>{feedback.stars}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(feedback.id)}>Edit</Button>
                  <Button onClick={() => handleDelete(feedback.id)}>Delete</Button>
                </TableCell>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </FeedbackApp>
  );
}

export default App;
