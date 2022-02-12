import {validatePlayerExistence} from "./validators";
import {validate} from "../../../../lib/event-validate"
import {curry} from "lodash/fp";

export const validatePlayerWonEvent = curry((playerIds, event): [] => {
    return validate([validatePlayerExistence(playerIds)], event);
});