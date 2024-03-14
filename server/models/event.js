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
    qrCode :{
        type : String
    },
    faceQrCode : {
        type : String
    },
    // Access link

    // Full access event 
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
    emailsArray : [
        {type : String}
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
            // status : {
            //     type : String,
            //     enum : ["pending", "rejected", "accepted", "delivered"],
            // },
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
    fullAccessPin :{
        type : String
    },
    faceSearchPin : {
        type : String
    },
    faceSearchPinRequired : {
        type : Boolean, 
        default : false
    },
    // Settings
    faceSearchAccess : {
        type : Boolean,
        default : false
    },
    fullEventAccess : {
        type : Boolean,
        default : false
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