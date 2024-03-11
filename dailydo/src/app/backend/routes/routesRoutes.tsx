const express = require('express');
const timesheetController = require('../controllers/timesheetController');

const router = express.Router();

router.post('/log', timesheetController.logTimesheet);
router.get('/suggestions', timesheetController.getSuggestions);

module.exports = router;
