const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const timesheetRoutes = require('./routes/timesheetRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.use('/api/timesheets', timesheetRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
