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
exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = __importStar(require("../models/userModel"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from the .env file
dotenv_1.default.config();
const saltRounds = 10;
const registerUser = async (req, res) => {
    try {
        const { error } = (0, userModel_1.validateUser)(req.body);
        if (error) {
            res.status(400).json({ message: error.details[0].message });
            return;
        }
        const { name, email, password } = req.body;
        let user = await userModel_1.default.findOne({ email });
        if (user) {
            res.status(400).json({ message: 'User already registered.' });
            return;
        }
        const hashedPassword = await bcrypt_1.default.hash(password, saltRounds);
        user = new userModel_1.default({ name, email, password: hashedPassword });
        await user.save();
        const token = user.generateToken();
        res.status(201).json({ token });
    }
    catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};
exports.registerUser = registerUser;
