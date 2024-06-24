import mongoose, { Document, Schema } from 'mongoose';
import Joi from 'joi';

export interface IBook extends Document {
  name: string;
  description: string;
  publishDate: Date;
  price: number;
}

const BookSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  publishDate: { type: Date, required: true },
  price: { type: Number, required: true },
});
// Create indexes
BookSchema.index({ name: 1 }, { unique: true });
BookSchema.index({ description: 1 });
const Book = mongoose.model<IBook>('Book', BookSchema);

export function validateBook(data: any) {
  const schema = Joi.object({
    name: Joi.string().required().min(1).max(255),
    description: Joi.string().required().min(1).max(1000),
    publishDate: Joi.date().required(),
    price: Joi.number().required().min(0),
  });

  return schema.validate(data);
}

export default Book;
