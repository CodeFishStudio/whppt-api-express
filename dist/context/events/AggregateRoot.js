"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggRoot = void 0;
const lodash_1 = require("lodash");
class AggRoot {
    apply(events) {
        (0, lodash_1.each)(events, (event) => {
            const self = this;
            if (self[event.eventType]) {
                self[event.eventType](event);
            }
        });
    }
}
exports.AggRoot = AggRoot;
//# sourceMappingURL=AggregateRoot.js.map