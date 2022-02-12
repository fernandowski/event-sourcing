import {validateFirstName, validatePlayerExistence} from "./validator";
import {validate} from "../../../../lib/event-validate"
import {curry} from "lodash/fp";

export const validatePlayerNameFixed = curry((playerIds, event): [] => {
    return validate([validateFirstName, validatePlayerExistence(playerIds)], event);
});