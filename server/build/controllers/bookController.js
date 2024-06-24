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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBooks = exports.createBook = void 0;
const bookModel_1 = __importStar(require("../models/bookModel"));
const createBook = async (req, res) => {
    try {
        const { error } = (0, bookModel_1.validateBook)(req.body);
        if (error) {
            res.status(400).json({ message: error.details[0].message });
            return;
        }
        const { name, description, publishDate, price } = req.body;
        // Check if a book with the same name already exists
        const existingBook = await bookModel_1.default.findOne({ name });
        if (existingBook) {
            res.status(400).json({ message: 'Book with this name already exists' });
            return;
        }
        const newBook = new bookModel_1.default({ name, description, publishDate, price });
        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating book', error });
    }
};
exports.createBook = createBook;
const getBooks = async (req, res) => {
    try {
        const { search, page = '1', limit = '10' } = req.query;
        const searchQuery = search
            ? {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } },
                ],
            }
            : {};
        const books = await bookModel_1.default.find(searchQuery)
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit));
        const totalBooks = await bookModel_1.default.estimatedDocumentCount(searchQuery);
        res.status(200).json({ books, totalBooks });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching books', error });
    }
};
exports.getBooks = getBooks;
