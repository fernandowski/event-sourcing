import {curry} from "lodash/fp";
import {PlayerWonEvent} from "../event/event";

export const validatePlayerExistence = curry((playersRegistered : [string], event: PlayerWonEvent): string | null => {
        const {data: {playerId}} = event
        return playersRegistered.includes(playerId) ? '' : `Cannot change win statistic - Player with id does not exist: ${playerId}`;
    }
);