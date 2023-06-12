import { NextFunction,Request,Response } from "express"

export function isLoggedInAPI(req:Request, res:Response, next:NextFunction){
    if(!req.session.userId){
        res.json({isError:true,errMess:'NO Permission access this action!'})
        return
    }
    next()
}

// res.json({isError:true,errMess:'no permission access this route'})