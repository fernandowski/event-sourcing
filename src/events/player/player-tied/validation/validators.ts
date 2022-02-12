import {curry} from "lodash/fp";
import {PlayerTiedEvent} from "../event/event";

export const validatePlayerExistence = curry((playersRegistered : [string], event: PlayerTiedEvent): string | null => {
        const {data: {playerId}} = event
        return playersRegistered.includes(playerId) ? '' : `Cannot change draw statistic - Player with id does not exist: ${playerId}`;
    }
);