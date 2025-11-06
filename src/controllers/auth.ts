import { Request, Response,NextFunction } from "express";
import { User } from "../models/user";
import { generateToken } from "../utils/generateToken";

interface AuthUser {
    username: string;
    email: string;
    password: string;
    role?: "admin" | "user";
}

// ✅ REGISTER USER

export const registerUser = async(req:Request<{},{},AuthUser>,res:Response,next:NextFunction):Promise<void>=> {
    let { username, email, password, role }: AuthUser = req.body;
    try {
        email = email.toLowerCase();
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        // Create new user
        const newUser = await User.create({
            username,
            email,
            password,
            role: role || "user",
        });
        // generate token
        const token = generateToken(String(newUser._id));
        res.status(201).json({token})
        
    } catch (error:any) {
        console.error(error,"Error during user registration");
        next(error);
        
    }
}


// ✅ LOGIN USER
export const loginUser = async(req:Request<{},{},AuthUser>,res:Response,next:NextFunction):Promise<void>=>{
    let { email, password } = req.body;
    try {
        // Convert email to lowercase
        email = email.toLowerCase();
        // Find user by email
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            res.status(401).json({ message: "Invalid email or password" });
            return;

        }
        // generate token (cast _id safely to string)
        const token = generateToken(String(user._id));
        res.status(200).json({ token });



    } catch (error) {
        console.error(error,"Error during user login");
        next(error);
        
    }

}

