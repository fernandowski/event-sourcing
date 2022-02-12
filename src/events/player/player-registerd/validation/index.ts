import {validateFirstName, validateEmailAddress} from "./validator";
import {validate} from "../../../../lib/event-validate"
import {PlayerRegisteredEvent} from "../event/event";
import {curry} from "lodash/fp";

export const validatePlayerRegisteredEvent = curry((registeredPlayers: [PlayerRegisteredEvent], event): [] => {
    return validate([validateFirstName, validateEmailAddress(registeredPlayers)], event);
});