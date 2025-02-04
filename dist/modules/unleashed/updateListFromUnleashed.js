"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const updateListFromUnleashed = {
    authorise({ $identity }, { user }) {
        return $identity.isUser(user);
    },
    exec({ $unleashed, $logger, $database }) {
        $logger.info(`Getting products from unleashed`);
        return $database
            .then(({ document }) => {
            return $unleashed
                .$get('Products?pageSize=50', 'pageSize=50')
                .then((results) => {
                let promiseChain = Promise.resolve();
                $logger.info('Starting Unleashed Queries, Total pages: %s', results.Pagination.NumberOfPages);
                for (let i = 0; i < results.Pagination.NumberOfPages; i++) {
                    promiseChain = promiseChain.then(() => {
                        $logger.info('Unleashed query page no: %s', i + 1);
                        return $unleashed
                            .$get(`Products/Page/${i + 1}?pageSize=50`, 'pageSize=50')
                            .then((_results) => {
                            $logger.info('Unleashed query page no: %s, Saving Data', i + 1);
                            const _savePromises = _results.Items.map((item) => {
                                (0, assert_1.default)(item.Guid, 'Unleashed item missing GUID.');
                                const unleashedProduct = Object.assign(Object.assign({}, item), { _id: item.Guid });
                                return document.save('unleashed', unleashedProduct);
                            });
                            return Promise.all(_savePromises);
                        });
                    });
                }
                return promiseChain;
            });
        })
            .then(() => { });
    },
};
exports.default = updateListFromUnleashed;
//# sourceMappingURL=updateListFromUnleashed.js.map