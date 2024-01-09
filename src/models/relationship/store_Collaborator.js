import { Schema, Types } from "mongoose";

const store_CollaboratorSchema  = new Schema({
    storeId: {
        type: Types.ObjectId,
        ref: "BarberShop",
        required: true
    },
    collaboratorId: {
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

export default store_CollaboratorSchema