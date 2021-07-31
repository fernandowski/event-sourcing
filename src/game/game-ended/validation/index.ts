import {curry} from "lodash/fp"
import {validators} from "./validator";
import {validate} from "../../../lib/event-validate"

export const validateGameEnded = curry(validate)(validators);