import {validatePlayerExistence} from "./validators";
import {validate} from "../../../../lib/event-validate"
import {curry} from "lodash/fp";

export const validatePlayerLostEvent = curry((playerIds, event): [] => {
    return validate([validatePlayerExistence(playerIds)], event);
});