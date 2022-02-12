import {v4} from "uuid";
import {DateTime} from 'luxon';

export const PLAYER_LOST = 'PLAYER_LOST';

export type PlayerLostData = {
    playerId,
}

export type  PlayerLostEvent = {
    type: string,
    id: string,
    eventTime: string,
    data: PlayerLostData
};

export const getPlayerLostEvent = (playerId: string): PlayerLostEvent => {
    return {
        type: PLAYER_LOST,
        id: v4(),
        eventTime: DateTime.now().toISO(),
        data: {
            playerId
        }
    }
}