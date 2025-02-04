"use strict";
const assert = require('assert');
const { pick } = require('lodash');
module.exports = () => {
    return function (user) {
        return Promise.resolve(user._id === 'guest');
    };
};
//# sourceMappingURL=isGuest.js.map