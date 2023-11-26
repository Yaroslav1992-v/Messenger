import mongoose, { Types } from 'mongoose';

const Schema = mongoose.Schema;
export const userSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String },
    username: { type: String },
    image: { type: String },
    city: { type: String },
    phone: { type: String },
    website: { type: String },
    profession: { type: String },
    about: { type: String },
    social: [{ type: Object }],
  },
  { timestamps: true },
);

export interface User {
  email: string;
  password: string;
  username: string;
  image?: string;
  city?: string;
  phone?: string;
  website?: string;
  about?: string;
  profession?: string;
  social: Social[];
}
export interface UserData extends User {
  _id: Types.ObjectId;
}
export interface Social {
  name: string;
  value: string;
}
export const Socials: Social[] = [
  { name: 'facebook', value: '' },
  { name: 'github', value: '' },
  { name: 'linkedIn', value: '' },
  { name: 'twitter', value: '' },
  { name: 'instagram', value: '' },
];
