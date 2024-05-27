import User from "../Model/userModel.js"
import bcrypt from "bcrypt"

export const signUp  = async (req,res)=>{
    try {

        const {mobile,password} = req.body
        if(!mobile && !password){
            res.status(401).json({message:"enter credentials"})
        }else{
            const existingUser  = await User.findOne({mobile})
            if(existingUser){
                res.status(401).json({message:"Phone number already exist"})
            }else{
                const hashedPassword = await bcrypt.hash(password,10)
                const newUser = new User({
                    mobile,
                    password:hashedPassword
                })
                await newUser.save()
                res.status(200).json({
                    message:"User saved successfully",
                    token:true
                })
            }
        }
        
    } catch (error) {
        console.log(error);
    }
}

export const SignIn = async (req,res)=>{
    try {
        const {mobile,password} = req.body
        if (!mobile || !password) {
            res.status(401).json("Invalid credentials");
          }
        const userFound = await User.findOne({mobile})
        if(userFound){
            const hashedPassword = userFound.password
            const passwordMatch = await bcrypt.compare(password, hashedPassword);
            if(passwordMatch){
                res.status(201).json({ message: "Logined successfully", token:true });
            }
        }else{
            res.status(401).json({message:"Mobile not found . Please signup"})
        }
    } catch (error) {
        res.status(401).json({message:"login failed"})

    }
} 
