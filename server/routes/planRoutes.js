const express = require("express");
const router = express.Router();

const middleware = require("../middleware/account");

const {
    getPlans,
    getPlan,
    createPlan,
    updatePlan,
    deletePlan,
} = require("../controller/planController")

// Get all plans
router.get("/plan/plans", getPlans);

// Get a single plan
router.get("/plan/:id", getPlan);

// Create a plan
router.post("/plan", middleware, createPlan);

// Update a plan
router.put("/plan/:id", middleware, updatePlan);

// Delete a plan
router.delete("/plan/:id", middleware, deletePlan);



module.exports = router