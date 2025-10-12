import { FieldsErrors } from "./validator-fields-interface";


export class ValidationError extends Error{
    constructor(message = "a"){
        super(message)
    }
} //só para sumir o erro!
export class EntityValidationError extends Error {
    constructor(public errors: FieldsErrors, message = "Validation error"){
        super(message);
    }

    count(){
        return Object.keys(this.errors).length;
    }
}

