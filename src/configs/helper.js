module.exports = {
    validEmailAndPassword(email, password) {
        let errors = [];
        if (email.length === 0) {
            errors.push('Email must be input.');
        } else if (!this.checkEmailFormat(email)) {
            errors.push('Invalid email format.');
        }

        if (password.length === 0) {
            errors.push('Password must be input.');
        } else if (password.length < 3) {
            errors.push('Password should be at least 3 characters long.');
        }

        return errors;
    },

    checkEmailFormat(value) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(value);
    }
};
