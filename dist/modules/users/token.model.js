"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserToken = void 0;
const mongoose_1 = require("mongoose");
const tokenSchema = new mongoose_1.Schema({
    type: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    isUsed: {
        type: Boolean,
        required: true,
        select: false,
    },
    expiresAt: {
        type: Date,
        required: false,
    },
}, {
    timestamps: true,
});
tokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL index
exports.UserToken = (0, mongoose_1.model)("token1", tokenSchema);
