import {curry, reduce} from 'lodash/fp';

const iterateeGenerator = curry((event, accumulatedErrors, validator) => {
    const error = validator(event);
    return error !== '' ? [...accumulatedErrors, error] : accumulatedErrors;
});

export const validate = curry((validators: [(event) => boolean], event: Record<any, any>): string[] => {
    const iteratee = iterateeGenerator(event);
    return reduce(iteratee, [])(validators)
});