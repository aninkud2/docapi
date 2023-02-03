const mongoose =require('mongoose')

const docSchema = new mongoose.Schema({
name: {
        type: String,
        required: [true, "Name is required"]
    },
   
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    mobileNo: {
        type: String,
        required: [true, "Phone number is required"]
    },
 birthDate: {
        type: String,
        required: [true, "Birthdate is required"]
    },
gender: {
        type: String,
        required: [true, "kindly provide your gender"]
    },
    speciality: {
        type: String,
        required: [true, "speciality is required"]
    },
   

location: {
        type: String,
        required: [true, "location is required"]
    },
   password: {
        type: String,
        required: [true, "Password is required"],
    },
    //   confirmPassword: {
    //     type: String,
    //     required: [true, "Confirm Password is required"],
    // },


      certificateUpload:{
    public_id: {
        type: String,
        required: [true, "Certificate mut be uploaded"],
         },
    url:{ type: String,
        required: [true, "Certificate mut be uploaded"]}},

    licennse: {
        public_id: {
            type: String,
            required: [true, "Certificate mut be uploaded"],
             },
        url:{ type: String,
            required: [true, "Certificate mut be uploaded"]}},
    
    proofOfId: {
        public_id: {
            type: String,
            required: [true, "Certificate mut be uploaded"],
             },
        url:{ type: String,
            required: [true, "Certificate mut be uploaded"]}},
    
    profilePic: {
        public_id: {
            type: String,
            required: [true, "Certificate mut be uploaded"],
             },
        url:{ type: String,
            required: [true, "Certificate mut be uploaded"]}},
    
    token: {
        type: String,
    },
    verify: {
        type: Boolean,
        default: false
    },
    // cloudId: {
    //     type: String
    // },
   
},  
{
 timestamps: true
})

const doc = mongoose.model('doc',docSchema)
module.exports= doc