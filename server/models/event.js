const mongose = require('mongoose');

const eventSchema = new mongose.Schema({
    eventName : {
        type : String
    },
    eventDate : {
        type : Date
    }, 
    eventCode : {
        type : String
    },
    coverImage : {
        type : String
    },
    description : {
        type : String
    },
    isSubEvents : {
        type : Boolean,
        default : false
    },
    parentEvent : {
        type : mongose.Schema.Types.ObjectId,
        ref : "event"
    },
    subEvents : [
        {
            type : mongose.Schema.Types.ObjectId,
            ref : "event"
        }
    ],
    fullAccess:{
        accessStatus:{type:Boolean, default :false},
        qrCode:{type:String},
        link:{type:string},
    },
    faceSearch:{
        accessStatus:{type:Boolean, default :false},
        qrCode:{type:String},
        link:{type:string},
    },
    qrCode :{
        type : String
    },

    link:{
        type : String
    },
    faceSearchLink : {
        type : String
    },
    imagesArray : [
        {
            type : String
        }
    ],
    videoLinks : [
        {
            title : {
                type : String
            },
            link : {
                type : String
            },
            description :{
                type : String
            },
            thumbnail : {
                type : String
            }
        }
    ],
    waterMarks : [
        {
            type : String
        }
    ],

    eventHost :{
        email : {
            type : String
        },
        name : {
            type : String
        },
        phone : {
            type : String
        }
    },
    eventAccessUsers : [
        {
            name : {
                type : String
            },
            email : {
                type : String
            }, 
            phone : {
                type : String
            },
            faceData : {
                type : String   
            },
            status : {
                type : String,
                enum : ["pending", "rejected", "accepted", "delivered"],
            },
            sharedImagesArray : [
                {
                    type : String
                }
            ]
        }
    ],
    eventImagesByUsers : [
        {
            name : {
                type : String
            },
            email : {
                type : String
            }, 
            phone : {
                type : String
            },
            status : {
                type : String,
                enum : ["pending", "rejected", "accepted", "delivered"],
            },
            sharedImagesArray : [
                {
                    type : String
                }
            ]
        }
    ],
    blockEmails : [
        {
            type : String
        }
    ],
    eventExpirationDate : {
        type : Date
    },
    dashboardId : {
        type: mongose.Schema.Types.ObjectId,
        ref: "dashboard",
    },
    owner : {
        type : String
    },
    status : {
        type : String,
        enum : ["published", "unpublished"],
        default : "unpublished"
    },
    pin :{
        type : String
    },
    pinRequired : {
        type : Boolean
    },
    // Settings
    faceSearch : {
        type : Boolean
    },
    fullEventAccess : {
        type : Boolean
    },
    allowUserToPostImages : {
        type : Boolean,
        default : false
    },

    createdAt : {
        type : Date,
        default : Date.now
    }
})

const eventModel = mongose.model('event', eventSchema);
module.exports = eventModel