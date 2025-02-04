"use strict";
const { $uploadDocToS3, $fetchDocFromS3 } = require('../../Services/Aws');
module.exports = () => {
    return { uploadDoc: $uploadDocToS3, fetchDoc: $fetchDocFromS3 };
};
//# sourceMappingURL=index.js.map