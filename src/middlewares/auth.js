import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import User from "../models/user.js";
dotenv.config()

const authErrorMessage = "Usuário não autorizado"

const requiredUser = (types) =>async (req, res, next) => {
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];
      if(!token) {
          return res.status(401).json({message: authErrorMessage})
      }
  
      try {
          const {userId, types} = jwt.verify(token, process.env.TOKEN_JWT);
          const userFound = await User.findById(userId)
          if(userFound) {
            return res.status(401).json({message: authErrorMessage})
          }

          next()
      } catch (error) {
          return res.status(401).json({message: authErrorMessage})
      }
   
  };

  export default requiredUser

