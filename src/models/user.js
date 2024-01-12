import { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Nome é obrigatório"],
  },
  lastname: {
    type: String,
    required: [true, "Sobrenome é obrigatório"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email obrigatório"],
    validate: [
      {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: function (props) {
          return "Endereço de e-mail inválido!";
        },
      },
      {
        validator: async function (email) {
          const emailExists = await model("User").findOne({ email });
          if (emailExists) {
            return false;
          }
          return true;
        },
        message: "Email ou senha inválida",
      },
    ],
  },
  confirmEmail: {
    type: String,
    required: true,
    select: false,
    validate: {
      validator: function(value) {
        return this.email === value
      },
      message: "Os campos de email e confirmação de email não coincidem"
    }
  },
  password: {
    type: String,
    requried: true,
  },
});



userSchema.post("validate", function (error, doc, next) {
    const firstErrorMessage = Object.values(error.errors)[0].message;
    error.message = firstErrorMessage;
    next(error);
});


userSchema.pre("save", async function (next) {
  const hashedPassword = await hash(this.password, 10);
  this.password = hashedPassword;
  this.confirmEmail = undefined
  next();
});

userSchema.post("save", function () {
  this.token = jwt.sign({ id: this.id }, process.env.TOKEN_JWT, {
    expiresIn: "1h",
  });
});

/*
userSchema.options.toJSON = {
  transform: function(doc, ret) {
    delete ret.confirmEmail;
    return ret;
  }
};
*/
export default model("User", userSchema);
