import mongoose, { Types } from 'mongoose';
const Schema = mongoose.Schema;
export const chatSchema = new Schema(
  {
    lastMessageAt: { type: Date, default: Date.now() },
    name: { type: String },
    IsGroup: { type: Boolean },
    users: [{ type: Types.ObjectId, ref: 'User' }],
    lastMessage: { type: Types.ObjectId, ref: 'Message' },
  },
  { timestamps: true },
);

export interface Chat {
  lastMessageAt?: Date;
  name?: string;
  isGroup: boolean;
  users: Types.ObjectId[];
  lastMessage?: string;
}
