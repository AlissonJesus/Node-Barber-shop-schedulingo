import { Schema, Types, model } from "mongoose";

const store_CollaboratorSchema  = new Schema({
    storeId: {
        type: Types.ObjectId,
        ref:  "Store",
        required: true
    },
    collaboratorId: {
        type: Types.ObjectId,
        required: true,
        ref: "Collaborator"
    },
    status: {
        type: String,
        enum: ["A", "I"],
        required: true,
        default: "A"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default model("store_Collaborator", store_CollaboratorSchema)