import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const storeSchema = new Schema({
  name: {
    type: String,
    required: [true, "Nome é obrigatório"],
  },
  businessHours: {
    days: {
      enum: [0, 1, 2, 3, 4, 5, 6],
      type: [Number],
      required: true,
    },
    common_opening: String,
    common_Closing: String,
    common_interval: String,
  },
  cover: String,
  email: {
    type: String,
    required: [true, "Email é obrigatório"],
  },
  password: {
    type: String,
    required: [true, "Senha é obrigatório"],
    default: null,
  },
  telephone: String,
  address: {
    city: String,
    uf: String,
    cep: String,
    number: String,
    nation: String,
  },
  geo: {
    type: String,
    coodinates: Array,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

storeSchema.pre("save", async function (next) {
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  next();
});

storeSchema.index({
  geo: "2dsphere",
});

export default model("Store", storeSchema);
