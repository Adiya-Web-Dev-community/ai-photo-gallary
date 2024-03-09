var mongose = require("mongoose");  

const userSchema = new mongose.Schema({
    name : {
        type : String
    },
    email : {
        type : String
    },
    mobile : {
        type : String
    },
    password : {
        type : String
    },
    dashboardId : {
        type: mongose.Schema.Types.ObjectId,
        ref: "dashboard",
    },
    isSetup : {
        type : Boolean,
        default : false
    },
    planArray :[
        {
            planId : {
                
                    type : mongose.Schema.Types.ObjectId,
                    ref: "plan",
                   
                
            }
            
        }
    ],
    otp : {
        type : String
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    // usersArray : [
    //     {
    //         name : { 
    //             type : String,
    //         },
    //         email : {
    //             type : String
    //         },
    //         role : {
    //             type : String
    //         }, 
    //         password : {
    //             type : String
    //         }
    //     }
    // ],
    resetToken: {
        type: String,
    },
    createdAt : {
        type : Date,
        default : Date.now
    }

})

const userModel = mongose.model("user", userSchema);

module.exports = userModel;
