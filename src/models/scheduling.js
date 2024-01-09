import { Schema, Types, model } from "mongoose";

const schedulingSchema = new Schema({
    clientId: {
        type: Types.ObjectId,
        required: true,
        ref: "Client"
    },
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
    serviceId: {
        type: Types.ObjectId,
        ref: "Service",
        required: true
    },
    commission: {
        type: Number,
        required: true,
    },
    value: {
        type: Number,
        required: true
    },
    transactionId: String,
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ["A", "I", "E"],
        required: true,
        default: "A"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default model("Scheduling", schedulingSchema);