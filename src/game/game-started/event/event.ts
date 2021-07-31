import { v4 } from 'uuid';
import { DateTime } from 'luxon';

export const GAME_STARTED  = 'GAME_STARTED';
export const GAME_TYPE = 'FREE_FOR_ALL';

export type GameStartedData = {
    gameType: string,
    maxPlayers: number,
    gameId: string,
}

export type GameStartedEvent = {
    type: string,
    id: string,
    eventTime: string,
    data: GameStartedData
};

export const getEvent =  (gameType: string, maxPayers : number): GameStartedEvent =>  {
    return {
        type: GAME_STARTED,
        id: v4(),
        eventTime: DateTime.now().toISO(),
        data: {
            gameType: gameType,
            maxPlayers: maxPayers,
            gameId: v4(),
        }
    }
}