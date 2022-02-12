import {PlayerRegisteredEvent} from '../event/event';
import {curry} from 'lodash/fp'

export const validateEmailAddress = curry((registeredPlayersPlayer: string[], createPlayerEvent: PlayerRegisteredEvent): string => {
    const {data: {userId}} = createPlayerEvent;
    return !registeredPlayersPlayer.includes(userId) ? '' : `Email Address is Taken Already. ${userId}`;
});

export const validateFirstName = curry((createPlayerEvent: PlayerRegisteredEvent): string  => {
    const {data: {firstName}} = createPlayerEvent;
    return firstName && firstName !== '' ? '' : 'First Name should not be empty';
});

