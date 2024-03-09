const User = require("../models/user");
const Dashboard = require("../models/dashboard");
const { sendOtpMail } = require("../helpers/emailHelper.js");
const { generateOTP } = require("../helpers/otpHelper.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    try {
        const { mobile, email, name } = req.body;

        // Check if email or mobile number is found but not verified
        const emailFoundButNotVerified = await User.findOne({
            email,
            isVerified: false,
        });
        const mobileFoundButNotVerified = await User.findOne({
            mobile,
            isVerified: false,
        });

        if (emailFoundButNotVerified) {
            sendOtpMail(
                emailFoundButNotVerified.email,
                emailFoundButNotVerified.otp
            );
            return res.status(204).json({
                success: false,
                message: "User found but not verified",
            });
        } else if (mobileFoundButNotVerified) {
            sendOtpMail(
                mobileFoundButNotVerified.email,
                mobileFoundButNotVerified.otp
            );
            return res.status(204).json({
                success: false,
                message: "User found but not verified",
            });
        }

        // Check if email or mobile number is already in use

        //
        const emailFound = await User.findOne({ email });
        const mobileFound = await User.findOne({ mobile });

        if (emailFound) {
            return res
                .status(409)
                .json({ success: false, message: "Email already in use" });
        } else if (mobileFound) {
            return res.status(409).json({
                success: false,
                message: "Mobile number already in use",
            });
        } else {
            const otp = generateOTP();
            let password = req.body.password;

            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(password, salt);
            password = hashedPassword;

            const userData = {
                mobile,
                name,
                email,
                password,
                otp: otp,
            };

            const user = await User.create(userData);
            sendOtpMail(email, otp);
            return res.status(200).json({
                success: true,
                message: "User created successfully",
                data: user,
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

const verifyOTP = async (req, res) => {
    try {
        // const accountId = req.body.email;
        const { email, otp } = req.body;
        const user = await User.findOne({
            email: email,
            otp: otp,
        });
        if (user) {
            user.isVerified = true;

            // DashBoard Creation
            const dashboard = await Dashboard.create({ userId: user._id });
            await dashboard.save();
            user.dashboardId = dashboard._id;
            user.isSetup = true;
            await user.save();
            const token = await jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
                expiresIn: "24h",
            });
            return res.status(201).json({
                token: token,
                dashboardId: dashboard._id,
                success: true,
                message: "Email verified successfully",
            });
        } else {
            return res.status(401).json({
                success: false,
                message: "Invalid OTP",
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

const signInUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userData = await User.findOne({ email: email });

        if (!userData || email != userData.email) {
            return res.status(404).json({
                success: false,
                message: "Invalid Email or Password",
            });
        }

        if (userData) {
            if (userData.isVerified == false) {
                return res.status(403).json({
                    success: false,
                    message: "Please verify your email",
                });
            }

            const passwordMatch = await bcrypt.compare(
                password,
                userData.password
            );

            if (passwordMatch) {
                const token = jwt.sign(
                    { _id: userData._id },
                    process.env.SECRET_KEY,
                    {
                        expiresIn: "24h",
                    }
                );

                return res.status(200).json({
                    success: true,
                    dashboardId : userData.dashboardId,
                    message: "Signin Successful",
                    token: token,
                });
            } else {
                return res.status(403).json({
                    success: false,
                    message: "Invalid Email or Password",
                });
            }
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// Update User profile
const profileUpdate = async (req, res) => {
    try {
        const { id } = req.account;
        const userData = req.body;
        if (userData.password) {
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(userData.password, salt);
            userData.password = hashedPassword;
        }
        const dbUpdateUserData = await User.findByIdAndUpdate(id, userData);
        return res.status(200).json({ success: true, dbUpdateUserData });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// Add user in dashboard
// const addUserInDashboard = async (req, res) => {

// }

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.accountId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        return res.status(200).json({
            success: true,
            data: user,
            message: "User found",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

module.exports = {
    registerUser,
    verifyOTP,
    signInUser,
    profileUpdate,
    getUserProfile,
};
