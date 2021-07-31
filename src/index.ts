import { getEvent }from './game/game-started/event/event';
import { validators } from "./game/game-started/validation/validator";
import { validate } from "./lib/event-validate";

const event = getEvent('TEAM_DEATH_MATCH', 9)


console.log(validate(validators, event))