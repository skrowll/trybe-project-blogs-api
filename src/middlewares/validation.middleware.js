const validations = {
    loginValidate: (email, password) => {
        if (email === '' || password === '') {
            return false;
        }
        return true;
    },
};

module.exports = validations;