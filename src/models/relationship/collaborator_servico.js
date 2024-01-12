import { Schema, Types, model } from "mongoose";

const collaboratorServiceSchema  = new Schema({
    serviceId: {
        type: Types.ObjectId,
        ref: "Service",
        required: true
    },
    collaboratorId: {
        type: Types.ObjectId,
        ref: "Collaborator",    
        required: true
    },
    status: {
        type: String,
        enum: ["A", "I", "E"],
        required: true,
        default: "A"
    },
    data: {
        type: Date,
        default: Date.now
    }
})

export default model("CollaboratorService", collaboratorServiceSchema)