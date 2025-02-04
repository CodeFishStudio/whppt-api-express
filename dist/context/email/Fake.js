"use strict";
module.exports = ({ $logger }) => {
    const send = function (email) {
        $logger.info('Sending Email: %o', email);
        return Promise.resolve();
    };
    return { send };
};
//# sourceMappingURL=Fake.js.map