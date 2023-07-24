const userModel = require("../models/userModel");

// register controller
exports.registerController = async (req,res) => {
    try {
        const {username, email, password} = req.body;
        // validation
        if(!username || !email || !password){
            return res.status(400).send({
                success: false,
                message: "Please Fill all fields"
            })
        }

        // existing user
        const existingUser = await userModel.findOne({email});
        if (existingUser) {
            return res.status(401).send({
              success: false,
              message: "user already exisits",
            });
          }

          // save new user
          const user = new userModel({username,email,password});
          await user.save();

          return res.status(201).send({
            success: true,
            message: "New User Created",
            user
          })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message:"Error in Register callback",
            success: false,
            error
        })
    }
}

// login controller
exports.loginController = async (req,res) => {}

// get all users controler
exports.getAllUsers = async (req,res) => {}

