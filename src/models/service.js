import { Schema, Types, model } from "mongoose";

const serviceSchema = new Schema({
  storeId: {
    type: Types.ObjectId,
    ref: "Store",
    required: true
  },
  photo: String,
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  commission: {
    type: Number,
    required: true,
  },
  recurrence: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["A", "I", "E"],
    default: "A",
  },
  date: {
    type: Date,
    default: Date.now,
  }
});


serviceSchema.pre("find", function() {
  this.where({ status: { $eq: 'A' } });
})

export default model("Service", serviceSchema);
