"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = validateUser;
const mongoose_1 = __importStar(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from the .env file
dotenv_1.default.config();
const MIN_NAME_LENGTH = 3;
const MAX_NAME_LENGTH = 40;
const MIN_EMAIL_LENGTH = 8;
const MAX_EMAIL_LENGTH = 255;
const MIN_PASSWORD_LENGTH = 6;
const MAX_PASSWORD_LENGTH = 64;
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        minlength: MIN_NAME_LENGTH,
        maxlength: MAX_NAME_LENGTH,
    },
    email: {
        type: String,
        required: true,
        minlength: MIN_EMAIL_LENGTH,
        maxlength: MAX_EMAIL_LENGTH,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: MIN_PASSWORD_LENGTH,
        maxlength: MAX_PASSWORD_LENGTH,
    },
});
userSchema.methods.generateToken = function () {
    return jsonwebtoken_1.default.sign({
        id: this._id,
        name: this.name,
        email: this.email,
    }, process.env.JWT_SECRET || 'secret');
};
const User = mongoose_1.default.model('User', userSchema);
function validateUser(data) {
    const schema = joi_1.default.object({
        name: joi_1.default.string().required().min(MIN_NAME_LENGTH).max(MAX_NAME_LENGTH),
        email: joi_1.default.string()
            .required()
            .email()
            .min(MIN_EMAIL_LENGTH)
            .max(MAX_EMAIL_LENGTH),
        password: joi_1.default.string()
            .required()
            .min(MIN_PASSWORD_LENGTH)
            .max(MAX_PASSWORD_LENGTH),
    });
    return schema.validate(data);
}
exports.default = User;
