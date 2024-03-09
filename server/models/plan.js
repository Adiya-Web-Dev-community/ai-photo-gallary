const mongoose = require('mongoose');

const PlanSchema = new mongoose.Schema({
    name : {
        type : String
    },
    price : {
        type : String
    },
    description : {
        type : String
    },
    active : {
        type : Boolean
    },
    storage : {
        type : Number
    },
    request : {
        type : Number
    },
    expiryIn : {
        type : Number
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
})

const PlanModel = mongoose.model('plans', PlanSchema);
module.exports = PlanModel;