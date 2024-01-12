import { compare } from "bcrypt";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config()

const registerUser = async (req, res, next) => {
  const payload = req.body;
  try {
    const { token } = await User.create(payload);
    return res.status(201).json({ token });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email }).select("password");
    if (!userFound) {
      return res.status(400).json({ message: "Email ou senha inválida" });
    }

    const isValidPassword = await compare(password, userFound.password);

    if (isValidPassword) {
      const token = jwt.sign({id:userFound.id}, process.env.TOKEN_JWT)
      return res.status(200).json({ token });
    }

    return res.status(400).json({ message: "Email ou senha inválida" });
  } catch (error) {
    next(error)
  }

  return res.status(200).json({ message: "Usuario logado com sucesso" });
};

export { registerUser, loginUser };
