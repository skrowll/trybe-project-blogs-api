const validations = {
    loginValidate: (email, password) => {
        if (email === '' || password === '') {
            return false;
        }
        return true;
    },
    userValidate: (displayName, email, password) => {
        const message = {
            displayName: '"displayName" length must be at least 8 characters long',
            email: '"email" must be a valid email',
            password: '"password" length must be at least 6 characters long',
            user: 'User already registered',
        };
        if (displayName.length < 8) {
            return message.displayName;
        }
        const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(email)) {
            return message.email;
        }
        if (password.length < 6) {
            return message.password;
        }
    },
};

module.exports = validations;