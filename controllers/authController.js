const userModel = require("../models/userModel")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const generateRandomCode = (length) => {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        code += charset[randomIndex];
    }
    return code;
};


const registerController = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ email: req.body.email })
        //validation
        if (existingUser) {
            return res.status(200)({
                success: false,
                message: 'User already exists'
            })
        }
        //hashed password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        req.body.password = hashedPassword

        const userId = generateRandomCode(4) // Generate a random Code

        //rest data
        const user = new userModel({
            ID: userId,
            ...req.body
        })

        await user.save()
        return res.status(200).send({
            success: true,
            message: 'User registered successfully',
            userID: userId,
            user,
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in registration',
            error
        })
    }
}

//login controller
const loginController = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Invalid Credentials'
            })
        }
        //check role
        if (user.role !== req.body.role) {
            return res.status(500).send({
                success: false,
                message: "role does not match"
            })
        }
        //compare password
        const comparePassword = await bcrypt.compare(req.body.password, user.password)
        if (!comparePassword) {
            return res.status(500).send({
                success: false,
                message: 'Invalid Credentials'
            })
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        return res.status(200).send({
            success: true,
            message: 'Login Sucessfully',
            token,
            user,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in login API',
            error
        })
    }
}

//GET CURRENT USER
const currentUserController = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId })
        return res.status(200).send({
            success: true,
            message: "User fetched successfully",
            user,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Unable to get current user",
            error,
        })
    }
}

module.exports = { registerController, loginController, currentUserController }