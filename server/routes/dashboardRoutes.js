const express = require("express");
const router = express.Router();

const middleware = require("../middleware/account");

const {
    getDashboardDetails,
    editDashboard
} = require("../controller/dashboardController");

// Get Dashboard Details
router.get('/admin/dashboard', middleware, getDashboardDetails);

// Update Dashboard Details
router.put('/admin/dashboard', middleware, editDashboard);

module.exports = router;