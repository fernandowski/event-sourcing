import {v4} from 'uuid';
import {DateTime} from 'luxon';

export const PLAYER_NAME_FIXED = 'PLAYER_NAME_FIXED';

export type PlayerNameFixedData = {
    playerId: string,
    firstName: string,
    lastName: string,
}

export type  PlayerNameFixedEvent = {
    type: string,
    id: string,
    eventTime: string,
    data: PlayerNameFixedData
};

export const getPlayerInformationChangedEvent = (playerId: string, firstName: string, lastName: string): PlayerNameFixedEvent => {
    return {
        type: PLAYER_NAME_FIXED,
        id: v4(),
        eventTime: DateTime.now().toISO(),
        data: {
            playerId, firstName, lastName
        }
    }
}