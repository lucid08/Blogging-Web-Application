const userModel = require('../models/userModel')
const bcrpyt = require('bcrypt')

// create user register user

exports.registerController = async (req,res) => {
    try {
        const {username,email,password} = req.body
        // validation
        if(!username || !email || !password){
            return res.status(400).send({
                success:false,
                message:'Please fill all the required fields'
            })
        }
        // existing user
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(401).send({
                success:false,
                message:'user already exists'
            })
        }
        const hashedPassword = await bcrpyt.hash(password,10)

        // save new user
        const user = new userModel({username,email,password:hashedPassword});
        await user.save()
        return res.status(201).send({
            success:true,
            message:'New User Created',
            user
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message:'Error in Register Callback',
            success:false,
            error
        })
    }
};

// get all users
exports.getAllUsers = async (req,res) => {
    try {
        const users = await userModel.find({})
        return res.status(200).send({
            userCount:users.length,
            success:true,
            message:"All users data",
            users,
        });
    } catch (error) {   
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error In Get All Users',
            error
        })
    }
};

// login 
exports.loginController = async (req,res) => {
    try {
        const {email,password} = req.body
        // Validation
        if(!email || !password){
            return res.status(401).send({
                success:false,
                message:'Please provide email or password'
            })
        }
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(200).send({
                success:false,
                message:'email is not registerd'
            })
        }
        // password
        const isMatch = await bcrpyt.compare(password,user.password)
        if(!isMatch){
            return res.status(401).send({
                success:false,
                message:'Invalid username or password'
            })
        }
        return res.status(200).send({
            success:true,
            message:'Login successfully',
            user
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error in login callback',
            error
        })
    }
};