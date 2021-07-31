import {IValidator} from "./IValidator";
import {curry, reduce} from 'lodash/fp';

const iterateeGenerator = curry((event, accumulatedErrors, validator) => {
    const error = validator.validate(event);
    return error !== null ? [...accumulatedErrors, error] : accumulatedErrors;
});

export const validate = curry((validators: [IValidator], event: Record<any, any>): string[] => {
    const iteratee = iterateeGenerator(event);
    return reduce(iteratee, [])(validators)
})

