import { v4 } from 'uuid';
import { DateTime } from 'luxon';

export const GAME_STOPPED = 'GAME_STOPPED'

export type gameStoppedData = {
    gameId: string,
}

export type gameStoppedEvent = {
    type: string,
    id: string,
    eventTime: string,
    data: gameStoppedData
};

export const getGameStoppedEvent =  (gameId: string): gameStoppedEvent =>  {
    return {
        type: GAME_STOPPED,
        id: v4(),
        eventTime: DateTime.now().toISO(),
        data: {
            gameId: gameId,
        }
    }
}