const Plan = require("../models/plan");
const DashBoard = require("../models/dashboard");
const User = require("../models/user");

// Get all plans
const getPlans = async (req, res) => {
    try {
        const plans = await Plan.find({ active: true });
        return res.status(200).json({
            message: "Plans fetched successfully",
            success: true,
            data: plans,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            success: false,
        });
    }
};

// Get a single plan
const getPlan = async (req, res) => {
    try {
        const plan = await Plan.findById(req.params.id);
        return res.status(200).json({
            message: "Plan fetched successfully",
            success: true,
            data: plan,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            success: false,
        });
    }
};

// Create a plan
const createPlan = async (req, res) => {
    try {
        const plan = await Plan.create(req.body);
        return res.status(200).json({
            message: "Plan created successfully",
            success: true,
            data: plan,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};

// Update a plan
const updatePlan = async (req, res) => {
    try {
        const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        return res.status(200).json({
            message: "Plan updated successfully",
            success: true,
            data: plan,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};

// Delete a plan
const deletePlan = async (req, res) => {
    try {
        const plan = await Plan.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message: "Plan deleted successfully",
            success: true,
            data: plan,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};

const takeAPlan = async (req, res) => {
    try {
        const user = req.accountId;
        const dashboard = await DashBoard.findOne({ userId: user });

        if (!dashboard) {
            return res.status(404).json({
                message: "Dashboard not found",
                success: false,
            });
        }


        const expireIn = await Plan.find({ _id: req.body.planId });
        const expiryDate = new Date() + expireIn * 24 * 60 * 60 * 1000;
        dashboard.plan.push({
            planId: req.body.planId,
            active : true,
            expiryDate : expiryDate,
            date : Date.now(),
        })

        return res.status(200).json({
            message:" PLan updated successfully",
            success: true,
    
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            success: false,
        });
    }
};

module.exports = {
    getPlans,
    createPlan,
    updatePlan,
    deletePlan,
    getPlan,
    takeAPlan
};
