const express = require("express");
const router = express.Router();

const middleware = require("../middleware/account");
const { takeAPlan } = require("../controller/planController");

const { registerUser,
    verifyOTP,
    signInUser,
    profileUpdate,
    getUserProfile
} = require("../controller/userController");

// Register User Route
router.post("/user/register", registerUser);

// Verify OTP
router.put("/user/verify-otp", verifyOTP);

// Sign In User
router.post("/user/signin", signInUser);

// Update Account Details
router.put("/user/update-user", middleware, profileUpdate);

// Take a plan
router.put('/user/plan', middleware, takeAPlan);

// User Profile 
router.get('/user/profile', middleware,getUserProfile);


module.exports = router;
