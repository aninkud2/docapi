const doc = require("../docModel/doc")
const bcryptjs = require ('bcryptjs')
const jwt = require('jsonwebtoken')
const cloudinary=require("../docUtil/cloudinary")
const sendEmail = require('../docUtil/email')
const dotenv = require('dotenv')
dotenv.config({path: './config/config.env'})
//const postImageUploader=require("../docUtil/multer")

exports.newDoc= async (req, res)=>{
    const  {name, email,mobileNo,birthDate,gender,speciality,location,password} = req.body
    try{
      
    
    const certificateUpload= await
           cloudinary.uploader.upload(
            req.files.certificateUpload.tempFilePath,{folder:"certificateUpload"},
            (err, certificateUpload) => {
              try {
                return certificateUpload;
              } catch (err) {
                return err;
              }
            }
          );
const licennse= await
cloudinary.uploader.upload(
 req.files.licennse.tempFilePath,{folder:"license"},
 (err, licennse) => {
   try {
     return licennse;
   } catch (err) {
     return err;
   }
  }
          );

const proofOfId= await
cloudinary.uploader.upload(
 req.files.proofOfId.tempFilePath,{folder:"proofOFId"},
 (err, proofOfId) => {
   try {
     return proofOfId;
   } catch (err) {
     return err;
   }
  }
          );
const profilePic= await
cloudinary.uploader.upload(
 req.files.profilePic.tempFilePath,{folder:"profile Pic"},
 (err, profilePic) => {
   try {
     return profilePic;
   } catch (err) {
     return err;
   }
  }
          );

const salt = bcryptjs.genSaltSync(10);
const hash = bcryptjs.hashSync(password, salt);

      const data ={
        name,
        email,
        mobileNo,
        birthDate,
        gender,
        speciality,
        location,
        password:hash,
        // confirmPassword:hash,
        certificateUpload:
        {
            public_id:certificateUpload.public_id,
            url:certificateUpload.secure_url
        },
        licennse:
        {
            public_id:licennse.public_id,
            url:licennse.secure_url
        },
        proofOfId:{
            public_id:proofOfId.public_id,
            url:proofOfId.secure_url
        },
        profilePic:
        {
            public_id:profilePic.public_id,
            url:profilePic.secure_url
        },
        
      }
        const createDoc= new doc(data)
        const myToken = jwt.sign({
            id:createDoc._id,
            password: createDoc.password,
            // confirmPassword: createDoc.confirmPassword

        }, process.env.JWTTOKEN, {expiresIn: "1d"})

        createDoc.token = myToken;

        await createDoc.save()

        const VerifyLink = `${req.protocol}://${req.get("host")}/api/docVerify/${createDoc._id}`
        const message = `Thank you for registering with us. Please click on this link ${VerifyLink} to verify`;
        sendEmail({
          email: createDoc.email,
          subject: "Kindly verify",
          message, 
        });

        res.status(201).json({
            message: "Doc  created",
            data:createDoc
           
        })
    }catch(err){
        res.status(400).json({
            message: err.message
        })
    }
}

exports.docVerify = async (req, res) => {
    try{    
        const docid = req.params.docid
        const user = await doc.findById(docid)
        await doc.findByIdAndUpdate(
            user._id,
            {
                verify: true
            },
            {
                new : true
            }
        )

        res.status(200).json({
            message: "you have been verified"
        })

    }catch(err){
        res.status(400).json({
            message:err.message
        })
    }
}


exports.logIn = async(req,res) =>  {
    try{
        const {email,password} = req.body
        const check = await doc.findOne({email:email})
        if(!check) return res.status(404).json({message:'Email not  registered'})
        const isPassword =await bcryptjs.compare(password,check.password)
        if(!isPassword) return res.status(404).json({message:'Email or password incorrect'})

        const myToken = jwt.sign({
            id:check._id,
            password: check.password}, process.env.JWTTOKEN, {expiresIn: "1d"})

        check.token = myToken 
        await check.save()
         res.status(201).json({
            message:"Successful",
            data:check
         })
    }catch(e){
        res.status(400).json({
            message:e.message
        })
    }
}


exports.forgotPassword = async (req, res) => {
    try{
        const {email} = req.body
        // let id = req.params.id
        const docEmail = await doc.findOne(email)
        console.log(docEmail)
        if(!docEmail) return  res.status(404).json({ message: "No Email" })
        const myToken = jwt.sign({
            id:docEmail._id
        }, process.env.JWTTOKEN, {expiresIn: "1m"})

        const VerifyLink = `${req.protocol}://${req.get("host")}/api/changepassword/${docEmail._id}/${myToken}`
        const message = `Use this link ${VerifyLink} to change your password`;
        sendEmail({
          email: docEmail.email,
          subject: "Reset Pasword",
          message,
        })
        
        res.status(202).json({
            message:"email have been sent"
        })

      
    }catch(err){
        res.status(400).json({
            message:err.message
        })
    }
}

exports.resetPassword = async (req, res) => {
    try {
        const {password} = req.body
        const id = req.params.id
        const passwordchange = await doc.findById(id)
        const salt = bcryptjs.genSaltSync(10);
        const hash = bcryptjs.hashSync(password, salt);

        await doc.findByIdAndUpdate(passwordchange._id,{
            password: hash
        },{new: true})

        res.status(202).json({
            message:"password updated"
        })

    } catch (err) {
        res.status(400).json({
            message:err.message
        })
    }
}

exports.logout=async(req,res)=>{
    try {const id=req.params.id;
        const {email,password}=req.body
        const token=jwt.sign({
            id,
            email,
            password,
            

        }, process.env.JWTDESTROY);
        doc.token=token 
        res.status(200).json(
            {message:"Sucessfully logged out"}
        )
    } catch (error) {
        res.status(400).json(
            {message:error.message}
        )
    }
} 