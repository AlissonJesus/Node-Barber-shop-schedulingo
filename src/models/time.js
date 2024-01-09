import { Schema, Types, model } from "mongoose";

const timeSchema = new Schema({
    storeId: {
        type: Types.ObjectId,
        ref:"barberShop",
        required: true
    },
    specialties: [{
        type: Types.ObjectId,
        ref: "service",
        required: true
    }],
    collaborator: [{
        type: Types.ObjectId,
        ref: "collaborator",
        required: true
    }],
    days: {
        type: [Number],
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export default model("Time", timeSchema);

