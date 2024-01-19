import mongoose, { Types } from 'mongoose';
const Schema = mongoose.Schema;
export const messageSchema = new Schema(
  {
    text: { type: String },
    messageWithImage: { type: Object },
    image: { type: String },
    sender: { type: Types.ObjectId, ref: 'User' },
    notRead: [{ type: Types.ObjectId, ref: 'User' }],
    chatId: { type: Types.ObjectId, ref: 'Chat' },
  },
  { timestamps: true },
);

export interface Message {
  text?: string;
  image?: string;
  messageWithImage?: { text: string; image: string };
  sender: Types.ObjectId[];
  chatId: Types.ObjectId[];
  notRead: Types.ObjectId[];
  createdAt?: string;
}
export interface MessageEdit extends Message {
  _id: Types.ObjectId;
}
