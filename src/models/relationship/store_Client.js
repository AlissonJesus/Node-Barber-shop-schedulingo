import { Schema, model, Types } from "mongoose";

const store_ClientSchema = new Schema({
    storeId: {
        type: Types.ObjectId,
        ref: "Service",
        required: true
    },
   clientId: {
        types: Types.ObjectId,
        ref: "Collaborator",
        required: true
    },
    status: {
        type: String,
        enum: ["A", "I"],
        required: true
    },
    data: {
        type: Date,
        default: Date.now
    }
})

export default model("Store_Client", store_ClientSchema)