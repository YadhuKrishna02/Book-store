"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const jwtSecret = process.env.JWT_SECRET || 'secret';
const auth = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log(token, 'ppp');
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        const user = await userModel_1.default.findById(decoded.id);
        if (!user) {
            return res
                .status(401)
                .json({ message: 'User not found, authorization denied' });
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.log(error, 'errr');
        res.status(401).json({ message: 'Token is not valid' });
    }
};
exports.default = auth;
