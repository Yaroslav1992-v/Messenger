import mongoose, { Types } from 'mongoose';
const Schema = mongoose.Schema;
export const chatSchema = new Schema(
  {
    lastMessageAt: { type: Date, default: Date.now() },
    name: { type: String },
    description: { type: String },
    image: { type: String },
    isGroup: { type: Boolean },
    admin: { type: Types.ObjectId, ref: 'User' },
    userThatLeft: { type: Types.ObjectId, ref: 'User' },
    users: [{ type: Types.ObjectId, ref: 'User' }],
    lastMessage: { type: Types.ObjectId, ref: 'Message' },
  },
  { timestamps: true },
);

export interface Chat {
  lastMessageAt?: Date;
  name?: string;
  isGroup: boolean;
  admin?: Types.ObjectId;
  users: Types.ObjectId[];
  image?: string;
  userThatLeft?: Types.ObjectId;
  lastMessage?: string;
  description?: string;
}
export interface EditedChat extends Chat {
  _id: Types.ObjectId;
}
