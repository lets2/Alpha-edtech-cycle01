import mongoose, { Schema, now } from 'mongoose';
import { ChatRoomsModel } from './interface';

const ChatRoomsSchema = new mongoose.Schema<ChatRoomsModel>({
  feedMessageOrigin: { type: Schema.Types.ObjectId, required: true, ref: 'FeedMessages' },
  owner: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
  numberOfPlayers: { type: Number, required: true },
  playerCharacters: [
    {
      characterId: { type: [Number], index: { sparse: true } },
      characterName: { type: String },
      player: { type: Schema.Types.ObjectId, ref: 'User' },
      deletedAt: { type: Date },
    },
  ],
  createdAt: { type: Date, default: now, immutable: true },
  updatedAt: { type: Date },
  deletedAt: { type: Date },
});

export const ChatRooms = mongoose.model('ChatRooms', ChatRoomsSchema);
