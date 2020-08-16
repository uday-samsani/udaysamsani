const User = require('../models/User');
const Post = require('../models/Post');
module.exports.validateSigninInput = async (
    firstname,
    lastname,
    email,
    password,
    confirmPassword,
    dob
) => {
    const errors = {};
    if (firstname === '') {
        errors.firstname = 'firstname must not be empty';
    }
    if (lastname === '') {
        errors.lastname = 'lastname must not be empty';
    }
    if (dob.trim() === '') {
        errors.dob = 'date of birth must not be empty';
    }
    if (email.trim() === '') {
        errors.email = 'email must not be empty';
    } else {
        const user = await User.findOne({ email });
        if (user) {
            errors.email = 'email linked to another account';
        } else {
            const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
            if (!email.match(regEx)) {
                errors.email = 'email must be a valid email address';
            }
        }
    }
    if (password === '') {
        errors.password = 'password must not be empty';
    } else if (password !== confirmPassword) {
        errors.password = 'passwords do not match';
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1,
    };
};

module.exports.validateLoginInput = (email, password) => {
    const errors = {};
    if (email.trim() === '') {
        errors.username = 'username must not be empty';
    }
    if (password === '') {
        errors.password = 'password must not be empty';
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1,
    };
};

module.exports.validatePostInput = async (title, body) => {
    const errors = {};
    if (title.trim() === '') {
        errors.title = 'title must not be empty';
    } else {
        const post = await Post.findOne({ title: title });
        if (post) {
            errors.title = 'title must be unique';
        }
    }
    if (body.trim() === '') {
        errors.body = 'body must not be empty';
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1,
    };
    console.log(errors);
};

module.exports.validatePostUpdateInput = async (postId, title, body) => {
    const errors = {};
    if (postId.trim() === '') {
        errors.post = 'post Id should not be empty';
    } else {
        const post = await Post.findById(postId);
        if (!post) {
            errors.post = 'post not found';
        }
    }
    if (title.trim() === '') {
        errors.title = 'title must not be empty';
    } else {
        const post = await Post.findOne({ title: title });
        console.log(post);
        if (post && post._id.toString() !== postId) {
            errors.title = 'title must be unique';
        }
    }
    if (body.trim() === '') {
        errors.body = 'body must not be empty';
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1,
    };
};

module.exports.validateCommentInput = (body) => {
    const errors = {};
    if (body.trim() === '') {
        errors.body = 'body must not be empty';
    }
    return { errors, valid: Object.keys(errors).length < 1 };
};
