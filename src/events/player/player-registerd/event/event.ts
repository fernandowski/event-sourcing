import {v4} from 'uuid';
import {DateTime} from 'luxon';

export const PLAYER_REGISTERED = 'PLAYER_REGISTERED'

export type PlayerRegisteredData = {
    playerId: string,
    firstName: string,
    lastName: string,
    userId: string,
    win: number,
    loss: number,
    draw: number
}

export type  PlayerRegisteredEvent = {
    type: string,
    id: string,
    eventTime: string,
    data: PlayerRegisteredData
};

export const getPlayerRegisteredEvent = (firstName: string, lastName: string, userId: string): PlayerRegisteredEvent => {
    return {
        type: PLAYER_REGISTERED,
        id: v4(),
        eventTime: DateTime.now().toISO(),
        data: {
            playerId: v4(), firstName, lastName, userId, win: 0, loss: 0, draw: 0
        }
    }
}