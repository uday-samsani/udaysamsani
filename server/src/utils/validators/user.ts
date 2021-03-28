import {FieldError, RegisterInputs, ValidatorResponse} from '../../types/user';

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

    const emailRegEx: RegExp = /[a-zA-Z0-9_\\.\\+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-\\.]+/;
    if (!options.email.trim().length) {
        errors.push({field: 'email', message: 'should not be empty'});
    } else if (!emailRegEx.test(options.email)) {
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