import { v4 } from 'uuid';
import { DateTime } from 'luxon';

export const GAME_INITIALIZED = 'GAME_INITIALIZED';
export const GAME_TYPE = 'FREE_FOR_ALL';

export type gameInitializeData = {
    gameType: string,
    maxPlayers: number,
    gameId: string,
}

export type gameInitializedEvent = {
    type: string,
    id: string,
    eventTime: string,
    data: gameInitializeData
};

export const getGameStoppedEvent =  (gameType: string, maxPayers : number): gameInitializedEvent =>  {
    return {
        type: GAME_INITIALIZED,
        id: v4(),
        eventTime: DateTime.now().toISO(),
        data: {
            gameType: gameType,
            maxPlayers: maxPayers,
            gameId: v4(),
        }
    }
}