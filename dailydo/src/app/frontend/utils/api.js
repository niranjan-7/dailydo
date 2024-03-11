// frontend/utils/api.js
export const postTimesheet = async (timesheetData) => {
    try {
      const response = await fetch('/api/timesheets/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(timesheetData),
      });
      if (!response.ok) {
        throw new Error('Failed to log timesheet');
      }
    } catch (error) {
      console.error('Error logging timesheet:', error.message);
    }
  };
  