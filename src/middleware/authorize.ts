import { NextFunction, Request, Response } from "express"
interface AuthRequest extends Request {
    user?: any;
}

export const authorize=(...roles:string[])=>{
    return(req:AuthRequest ,res:Response,next:NextFunction):void=>{
        if(!roles.includes(req.user.role)){

            res.status(403).json({message:"Forbidden: You do not have permission to access this resource"});
            return;
        }
        next();

    }
}