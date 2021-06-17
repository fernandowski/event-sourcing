import { getEvent }from './game/game-started/event/event';
import { validators } from "./game/game-started/event/validator";
import { eventValidate } from "./lib/event-validate";

const event = getEvent('TEAM_DEATH_MATCH', 9)


console.log(eventValidate(validators, event))