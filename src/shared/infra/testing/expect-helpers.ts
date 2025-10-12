
//testing é algo que guia o teste

import { contains } from "class-validator";
import { FieldsErrors } from "../../domain/validators/validator-fields-interface";
import { ClassValidatorFields } from "../../domain/validators/class-validator-fields";
import { EntityValidationError } from "../../domain/validators/validation.error";

type Expected = | {
    validator: ClassValidatorFields<any>; data: any
} | (() => any)

expect.extend({
    containsErrorMessage(expected: Expected, received: FieldsErrors) {
        if (typeof expected === "function") {
            try {
                expected()
                return isValid();
            } catch (e) {
                const error = e as EntityValidationError;
                return assertContainsErrorsMessage(error.errors, received);
            }
        } else {
            const { validator, data } = expected;
            const validated = validator.validate(data);

            if (validated) {
                return isValid();
            }

            return assertContainsErrorsMessage(validator.errors!, received)
        }
    }

})


function assertContainsErrorsMessage(
    expected: FieldsErrors,
    received: FieldsErrors
) {
    const isMatch = expect.objectContaining(received).asymmetricMatch(expected);

    return isMatch ? isValid() :
        {
            pass: false,
            message: () => `The validation errors not contains ${JSON.stringify(
                received
            )}. Current: ${JSON.stringify(expected)}`,
        };
}

function isValid() {
    return { pass: true, message: () => "" };
}
