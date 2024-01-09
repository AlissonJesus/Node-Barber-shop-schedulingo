import { Schema, model } from "mongoose";

const collaboratorSchema = new Schema({
  name: {
    type: String,
    required: [true, "Nome é obrigatório"],
  },
  telephone: {
    type: String,
    required: true,
  },
  photo: String,
  email: {
    type: String,
    required: [true, "Email é obrigatório"],
  },
  password: {
    type: String,
    required: [true, "Senha é obrigatório"],
    default: null,
  },
  birthDate: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    enum: ["M", "F"],
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["A", "I"],
    default: "A",
  },
  bankAccount: {
    holder: {
      type: String,
      required: true,
    },
    cpfCnpj: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    agency: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    dv: {
      type: String,
      required: true,
    },
  },
  recipientId: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

collaboratorSchema.post("save", function (error, doc, next) {
  if (error.name === "ValidationError") {
    const firstErrorMessage = Object.values(error.errors)[0].message;
    error.message = firstErrorMessage;
    next(error)
    return
  }
  next(error);
});

export default model("Collaborator", collaboratorSchema);
