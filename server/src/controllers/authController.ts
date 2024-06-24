import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User, { validateUser } from '../models/userModel';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();
const saltRounds = 10;

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { error } = validateUser(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ message: 'User already registered.' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = user.generateToken();

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};
