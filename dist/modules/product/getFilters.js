"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getFilters = {
    exec({ $database }) {
        return $database.then(({ queryDistinct }) => {
            return Promise.all([
                queryDistinct('products', { distinct: 'family' }),
                queryDistinct('products', { distinct: 'customFields.varietal' }).then(styles => {
                    return styles.sort();
                }),
                queryDistinct('products', { distinct: 'customFields.vintage' }).then(vintages => {
                    return vintages.sort().reverse();
                }),
                queryDistinct('products', { distinct: 'customFields.filterName' }).then(filterNames => {
                    return filterNames.sort().reverse();
                }),
            ]).then(([collections, styles, vintages, filterNames]) => {
                return { collections, styles, vintages, filterNames };
            });
        });
    },
};
exports.default = getFilters;
//# sourceMappingURL=getFilters.js.map