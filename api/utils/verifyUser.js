import jwt from 'jsonwebtoken'
import { errorHandler } from './error.js';
export const verifyToken= (req, res, next)=>{
//    console.log("req-->", req)
    const token=req.headers.authorization || req.query.token || req.body.token;
    console.log("token------", token)
    if(!token){
        return next(errorHandler(404, "unauthorized"))
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
        if(err) return next(errorHandler(403, 'forbidden'))
        req.user=user
      next()
})

}