import {v4} from "uuid";
import {DateTime} from 'luxon';

export const PLAYER_TIED = 'PLAYER_TIED';

export type PlayerTiedData = {
    playerId
}

export type  PlayerTiedEvent = {
    type: string,
    id: string,
    eventTime: string,
    data: PlayerTiedData
};

export const getPlayerTiedEvent = (playerId : string): PlayerTiedEvent => {
    return {
        type: PLAYER_TIED,
        id: v4(),
        eventTime: DateTime.now().toISO(),
        data: {
            playerId
        }
    }
};