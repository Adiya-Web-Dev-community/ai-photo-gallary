const Dashboard = require("../models/dashboard");
const User = require("../models/user");
const getDashboardDetails = async (req, res) => {
    try {
        const account = await Dashboard.find({
            userId: req.accountId
        })

        if(!account) {
            return res.status(404).json({
                success: false,
                message: "Dashboard not found",
            })
        }

        return res.status(200).json({
            success: true,
            message: "Dashboard fetched successfully",
            data: account
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}


const editDashboard = async (req, res) => {
    try {
        const account = await User.findOne({
            _id: req.accountId
        })

        if(!account) {
            return res.status(404).json({
                success: false,
                message: "Account not found",
            })
        }

        const dashboard = await Dashboard.findOneAndUpdate({
            _id: account.dashboardId,
        }, req.body, {
            new: true
        })

        account.isSetup =true;
        await account.save();

        if(!dashboard) {
            return res.status(404).json({
                success: false,
                message: "Dashboard not found",
            })
        }
        return res.status(200).json({
            success: true,
            message: "Dashboard updated successfully",
            data: dashboard
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}






module.exports = {
    getDashboardDetails,
    editDashboard
}