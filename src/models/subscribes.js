import mongoose from "mongoose";
import validators from "./validators";
const scribesSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
            validate: {
                validator: validators.validateUserName,
                message:
                    "should be a valid first name (English chars, digits, space or -.)",
            },
        },
        email: {
            type: String,
            required: true,
            unique: true,
            maxlength: [255, "Email length must be at most 255"],
            validate: {
                validator: validators.validateEmail,
                message: "should be a valid email address",
            },
        },
        ip: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

scribesSchema.index({ email: 1, ip: 1 }, { unique: true });

module.exports =
    mongoose.models.subscribes || mongoose.model("subscribes", scribesSchema);
