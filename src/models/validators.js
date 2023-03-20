import email from "isemail";

const isEmpty = (val) => {
    return val === null || val === undefined;
};
const validateEmail = (mail) => {
    return !isEmpty(mail) && email.validate(mail);
};

const validateUserName = (name) => {
    return (
        !isEmpty(name) &&
        (email.validate(name) || /^[a-z0-9-. ]{2,15}$/i.test(name))
    );
};
module.exports = {
    validateEmail,
    validateUserName,
};
