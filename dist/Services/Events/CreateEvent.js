"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEvent = void 0;
const CreateEvent = (user) => {
    return (type, data) => {
        return {
            eventType: type,
            timestamp: new Date(),
            user,
            data,
        };
    };
};
exports.CreateEvent = CreateEvent;
//# sourceMappingURL=CreateEvent.js.map