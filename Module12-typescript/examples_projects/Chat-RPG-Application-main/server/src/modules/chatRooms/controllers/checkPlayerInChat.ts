import { Request, Response } from 'express';
import * as chatFeedRoomServices from '../services';
import { AuthenticatedUserDataRequest } from '../../../interfaces';
import { Types } from 'mongoose';

export async function checkPlayerInChat(req: Request, res: Response): Promise<void> {
  const chatRoomId = req.params.chatRoomId as unknown as Types.ObjectId;
  const userId = (req as AuthenticatedUserDataRequest).userId;

  const chatRoom = await chatFeedRoomServices.getChatRoomByIdAndUserId(chatRoomId, userId);

  if (!chatRoom.error) {
    if (chatRoom.data.chatRoom.length === 0) {
      res.status(200).json({ message: 'Usuário não é um jogador da sala', data: false });
      return;
    } else {
      res.status(200).json({ message: 'Usuário é um jogador da sala', data: true });
      return;
    }
  }

  res.status(chatRoom.error).json(chatRoom.message);
  return;
}
