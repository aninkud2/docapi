require('dotenv').config();

const users = require('../docModel/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../docUtil/email')

exports.userSignUp = async(req,res) => {
    try{
        const {firstName, lastName, email, mobileNumber, dateOfBirth, gender, password} = req.body;
        const salted =  bcrypt.genSaltSync(10);
        const hashed =  bcrypt.hashSync(password, salted);

        const datas = {
            firstName, 
            lastName, 
            email, 
            mobileNumber, 
            dateOfBirth,
            gender,
            password:hashed
        }

        const createdUser = new users(datas);

        const userToken = jwt.sign({
            id:createdUser._id,
            email:createdUser.email,
            password:createdUser.password
        },process.env.JWT_TOKEN, {expiresIn:"1d"});
         
        createdUser.token = userToken

        await createdUser.save()

        const VerifyLink = `${req.protocol}://${req.get("host")}/api/verifyUser/${createdUser._id}`
        const message = `Thank you for registering with us. Please click on this link ${VerifyLink} to verify`;
        sendEmail({
          email: createdUser.email,
          subject: "Kindly verify",
          message,
        });

        res.status(201).json({
            message: 'User created successfully',
            data:createdUser
        })


    }catch(e){
        res.status(400).json({
            message:e.message
        })
    }
}




exports.userlogIn = async (req,res) => {
    try{
        const {email,password} = req.body;
        const crossCheck = await users.findOne({email:email})
        if(!crossCheck)return res.status(400).json({message: "No such email in the database"});
        const checkPassword = await bcrypt.compare(password, crossCheck.password)
        if(!checkPassword) return res.status(400).json({message:"Not found"})

        const userToken = jwt.sign({
            id:crossCheck._id,
            email:crossCheck.email,
            password:crossCheck.password
        },process.env.JWT_TOKEN, {expiresIn:"1d"});
         
        users.token = userToken
        await crossCheck.save();

        res.status(201).json({
            message: 'Successfully loggedin',
            data:crossCheck
        })
    }catch(e){
        res.status(400).json({
            message:e.message
        })
    }
}

exports.verifyUser = async (req, res) => {
    try{   
        const id = req.params.id
    const user = await users.findById(id)
        await users.findByIdAndUpdate(
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


exports.forgotpassword = async (req, res) => {
    try{
        const {email} = req.body
        const userEmail = await users.findOne({email})
        if(!userEmail) return  res.status(404).json({ message: "No Email" })
        const myToken = jwt.sign({
            id:userEmail._id,
            IsAdmin:userEmail.isAdmin},
            process.env.JWT_TOKEN, {expiresIn: "1d"})

        const VerifyLink = `${req.protocol}://${req.get("host")}/api/forgotPassword/${userEmail._id}/${myToken}`
        const message = `Use this link ${VerifyLink} to change your password`;
        sendEmail({
          email: userEmail.email,
          subject: "Reset Password",
          message,
        })
        
        res.status(202).json({
            message:"email have been sent"
        })
    }catch(err){
        res.status(400).json({
            message:err.message
        })
    }}

    exports.Resetpassword = async (req, res) => {
        try {
            const {password} = req.body
            const id = req.params.id
            const passwordchange = await users.findById(id)
            const salt = await bcrypt.genSaltSync(10);
            const hash = await bcrypt.hashSync(password, salt);
    
            await users.findByIdAndUpdate(passwordchange._id,{
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

    exports.logOut = async (req, res)=>{
        try{
        const id = req.params.id;
        const {email, password} = req.body
        const token = await jwt.sign({
            id,
            email,
            password,
        }, process.env.JWTDESTROY);

        users.token =token
         res.status(200).json({
            message: "Successful logOut"
          });
        }catch(e){
            res.status(400).json({
                message: e.message
            });
        }}
    