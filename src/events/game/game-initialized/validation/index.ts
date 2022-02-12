import {curry} from "lodash/fp"
import {validators} from "./validator";
import {validate} from "../../../../lib/event-validate"

export const validateGameInitialized = curry(validate)(validators);