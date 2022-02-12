import {v4} from "uuid";
import {DateTime} from 'luxon';

export const PLAYER_WON = 'PLAYER_WON';

export type PlayerWonData = {
    playerId
}

export type  PlayerWonEvent = {
    type: string,
    id: string,
    eventTime: string,
    data: PlayerWonData
};

export const getPlayerWonEvent = (playerId: string): PlayerWonEvent => {
    return {
        type: PLAYER_WON,
        id: v4(),
        eventTime: DateTime.now().toISO(),
        data: {
            playerId
        }
    }
};