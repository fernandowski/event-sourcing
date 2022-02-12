import {curry} from "lodash/fp";
import {PlayerLostEvent} from "../event/event";

export const validatePlayerExistence = curry((playersRegistered : [string], event: PlayerLostEvent): string | null => {
        const {data: {playerId}} = event
        return playersRegistered.includes(playerId) ? '' : `Cannot change loss statistic - Player with id does not exist: ${playerId}`;
    }
);
