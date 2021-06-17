import {IValidator} from "./IValidator";
import {curry, reduce, stubTrue, cond } from 'lodash/fp';

const iterateeGenerator = curry((event, accumulatedErrors, validator) => {
    const error = validator.validate(event);
    return error !== null ? [...accumulatedErrors, error] : accumulatedErrors;
});

export const eventValidate = curry((validators: [IValidator], event: Record<any, any>): string[] => {
    const iteratee = iterateeGenerator(event);
    return reduce(iteratee, [])(validators)
})

