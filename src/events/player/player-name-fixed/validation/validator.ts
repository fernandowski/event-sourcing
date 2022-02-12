import {PlayerNameFixedEvent} from '../event/event';
import {curry} from 'lodash/fp'

export const validateFirstName = curry((createPlayerEvent: PlayerNameFixedEvent): string => {
    const {data: {firstName}} = createPlayerEvent;
    return firstName && firstName !== '' ? '' : 'First Name should not be empty';
});

export const validatePlayerExistence = curry((playerCreatedEvents, event: PlayerNameFixedEvent): string => {
        const {data: {playerId}} = event
        return playerCreatedEvents.includes(playerId) ? '' : `Player with id does not exist: ${playerId}`;
    }
);

