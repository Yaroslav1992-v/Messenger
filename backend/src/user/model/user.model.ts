import mongoose from 'mongoose';
const Schema = mongoose.Schema;
export const userSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String },
    username: { type: String },
    image: { type: String },
  },
  { timestamps: true },
);

export interface User {
  email: string;
  password: string;
  username: string;
  image?: string;
}
