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
exports.validateBook = validateBook;
const mongoose_1 = __importStar(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
const BookSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    publishDate: { type: Date, required: true },
    price: { type: Number, required: true },
});
// Create indexes
BookSchema.index({ name: 1 }, { unique: true });
BookSchema.index({ description: 1 });
const Book = mongoose_1.default.model('Book', BookSchema);
function validateBook(data) {
    const schema = joi_1.default.object({
        name: joi_1.default.string().required().min(1).max(255),
        description: joi_1.default.string().required().min(1).max(1000),
        publishDate: joi_1.default.date().required(),
        price: joi_1.default.number().required().min(0),
    });
    return schema.validate(data);
}
exports.default = Book;
