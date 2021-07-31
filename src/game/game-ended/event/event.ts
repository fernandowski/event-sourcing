import { v4 } from 'uuid';
import { DateTime } from 'luxon';

export const GAME_ENDED = 'GAME_ENDED'

export type GameEndedData = {
    gameId: string,
}

export type GameStartedEvent = {
    type: string,
    id: string,
    eventTime: string,
    data: GameEndedData
};

export const getEndedEvent =  (gameId: string): GameStartedEvent =>  {
    return {
        type: GAME_ENDED,
        id: v4(),
        eventTime: DateTime.now().toISO(),
        data: {
            gameId: gameId,
        }
    }
}