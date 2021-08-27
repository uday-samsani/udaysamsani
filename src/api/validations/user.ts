import { RegisterInputs, ValidatorResponse, LoginInputs} from '../../types/user';
import {FieldError} from "../../types"

const validateEmail=(email:string):boolean=>{
    const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regularExpression.test(email.toLowerCase());
}

export const validateRegisterInput = (options: RegisterInputs): ValidatorResponse => {
    let errors: FieldError[] = [];

    if (!options.firstname.trim().length) {
        errors.push({field: 'firstname', message: 'should not be empty'});
    }

    if (!options.lastname.trim().length) {
        errors.push({field: 'lastname', message: 'should not be empty'});
    }

    if (!options.password.trim().length) {
        errors.push({field: 'password', message: 'should not be empty'});
    }

    if (!options.email.trim().length) {
        errors.push({field: 'email', message: 'should not be empty'});
    } else if (!validateEmail(options.email)) {
        errors.push({field: 'email', message: 'should be valid email address'});
    }

    if (!options.dob) {
        errors.push({field: 'dob', message: 'should not be empty'});
    } else {
        const dob: Date = new Date(options.dob);
        if (new Date().getFullYear() - dob.getFullYear() < 0) {
            errors.push({field: 'dob', message: 'should not be from future'});
        }else if(new Date().getFullYear() - dob.getFullYear() > 125){
            errors.push({field: 'dob', message: 'should be valid'});
        }
    }

    return {errors};
};

export const validateLoginInput = (options: LoginInputs): ValidatorResponse => {
    let errors: FieldError[] = [];

    if (!options.password.trim().length) {
        errors.push({field: 'password', message: 'should not be empty'});
    }

    if (!options.email.trim().length) {
        errors.push({field: 'email', message: 'should not be empty'});
    } else if (!validateEmail(options.email)) {
        errors.push({field: 'email', message: 'should be valid email address'});
    }

    return {errors};
};