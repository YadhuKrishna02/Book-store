import mongoose, { Document, Schema } from 'mongoose';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();
const MIN_NAME_LENGTH = 3;
const MAX_NAME_LENGTH = 40;

const MIN_EMAIL_LENGTH = 8;
const MAX_EMAIL_LENGTH = 255;

const MIN_PASSWORD_LENGTH = 6;
const MAX_PASSWORD_LENGTH = 64;

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
 
  generateToken: () => string;
}

const userSchema: Schema = new Schema({
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

userSchema.methods.generateToken = function (): string {
  return jwt.sign(
    {
      id: this._id,
      name: this.name,
      email: this.email,
    },
    process.env.JWT_SECRET || 'secret'
  );
};

const User = mongoose.model<IUser>('User', userSchema);

export function validateUser(data: any) {
  const schema = Joi.object({
    name: Joi.string().required().min(MIN_NAME_LENGTH).max(MAX_NAME_LENGTH),
    email: Joi.string()
      .required()
      .email()
      .min(MIN_EMAIL_LENGTH)
      .max(MAX_EMAIL_LENGTH),
    password: Joi.string()
      .required()
      .min(MIN_PASSWORD_LENGTH)
      .max(MAX_PASSWORD_LENGTH),
  });

  return schema.validate(data);
}

export default User;
