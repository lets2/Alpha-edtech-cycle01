/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { FeedMessages } from '../model';
import { connectToMongoDB } from '../../../config/mongodb';
import { FeedMessagesModel } from '../interface';
import { ErrorWithStatus } from '../../../utils/errorWithStatus';
import { IUser } from '../../users/interface';

export async function create(param: FeedMessagesModel) {
  try {
    await connectToMongoDB();

    const newFeed = new FeedMessages();

    if (param.numberOfPlayers !== param.playerCharacters.length) {
      throw new ErrorWithStatus('Deve ser informado uma quantidade de personagens compatível com o número de jogadores.', 400);
    }

    newFeed.owner = param.owner;
    newFeed.title = param.title;
    newFeed.content = param.content;
    newFeed.image = param.image;
    newFeed.numberOfPlayers = param.numberOfPlayers;
    newFeed.playerCharacters = param.playerCharacters;
    newFeed.numberOfComments = param.numberOfComments ?? 0;
    newFeed.numberOfLikes = param.numberOfLikes ?? 0;

    await newFeed.save();

    await newFeed.populate<{ owner: Pick<IUser, 'contact'> }>('owner', 'contact.userName' );

    return {
      message: 'Feed adicionado com sucesso!',
      data: {
        newFeed,
      },
    };
  } catch (error) {
    let errorStatus: number | null;
    let errorMessage: string | null;
    if (error instanceof ErrorWithStatus) {
      errorStatus = error.getStatus();
      errorMessage = error.message;
    }
    return {
      error: errorStatus ?? 500,
      message: errorMessage ?? 'Erro ao adicionar feed',
    };
  }
}
