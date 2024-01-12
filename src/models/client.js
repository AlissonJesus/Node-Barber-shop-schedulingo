import { Schema, model, Types } from "mongoose";

const clientSchema = new Schema({
  name: {
    type: String,
    required: [true, "Nome é obrigatório"],
  },
  telephone: {
    type: String,
    required: true
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
  document: {
    type: {
      type: String,
      enum: ['individual', 'corporation'],
      required: true
    },
    number: {
      type: Number,
      required: true
    }
  },
  address: {
    city: String,
    uf: String,
    cep: String,
    number: String,
    nation: String,
  },
  customerId: {
    type: Types.ObjectId,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
  
});

export default model("Client", clientSchema);
