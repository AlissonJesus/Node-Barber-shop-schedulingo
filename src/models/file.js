import { Schema, model } from "mongoose";

const fileSchema = new Schema({
  referenceId: {
    type: Schema.Types.ObjectId,
    refpath: "model",
  },
  model: {
    type: String,
    required: true,
    enum: ["Service", "Store"],
  },
  path: {
    type: String,
    required: true,
  },
  registerDate: {
    type: Date,
    default: Date.now,
  },
});

export default model('File', fileSchema)    