import { Schema, Types } from "mongoose";

const collaboratorServiceSchema  = new Schema({
    serviceId: {
        type: Types.ObjectId,
        ref: "Service",
        required: true
    },
    collaboratorId: {
        types: Types.ObjectId,
        ref: "Collaborator",
        required: true
    },
    status: {
        type: String,
        enum: ["A", "I", "E"],
        required: true
    },
    data: {
        type: Date,
        default: Date.now
    }
})

export default collaboratorServiceSchema