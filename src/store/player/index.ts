import {getEvents, getEventsByEventType, writeToStore} from "../store-lib";
import {PLAYER_REGISTERED} from "../../events/player/player-registerd/event/event";
import {map, pipe} from "lodash/fp";

export const writeToPlayerStore = writeToStore('player');

export const getPlayerEventsByEventType = (eventType: string) => (getEventsByEventType('player', eventType));

export const fetchEventsByPlayerId = (id: string) => {
    return getEvents('player', (data) => {
        try {
            const {data: {playerId}} = JSON.parse(data.replace(/\r?\n/g, ''));
            return playerId === id;
        } catch (e) {
            return false;
        }
    });
}

export const fetchRegisteredPlayerIds = (): Promise<[string]> => {
    return getPlayerEventsByEventType(PLAYER_REGISTERED)
        .then((events) => (pipe(map(({data: {playerId}}) => (playerId)))(events)))
};