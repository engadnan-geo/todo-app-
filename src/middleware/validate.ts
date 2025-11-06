import {Request,Response,NextFunction} from "express";
import {ZodSchema} from "zod";

export const validate= <T extends ZodSchema>(schema: T)=>(req: Request, res: Response,next: NextFunction): void=>{
const result=schema.safeParse(req.body);
if(!result.success){
    const formatted=result.error.format();
    console.log("Validation Error:", formatted);
    console.log(Object.keys(formatted));
     res.status(400).json({
        message:"Validation Error",
        success:false,
        errors:Object.keys(formatted).map(field=>({
            field,
            message:formatted[field]?._errors?.[0]||"Invalid value"
        }))
    });
}
next();

}