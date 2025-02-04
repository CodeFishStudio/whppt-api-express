"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
// module.exports = context => {
const Email = context => {
    // const { $logger, $hosting } = context;
    const { $hosting } = context;
    // const providers = { AwsSmtp, Fake } as any; // AwsApi comming soon
    return $hosting.then(({ email }) => {
        // const configuredProvider = providers[email.provider || 'Fake'];
        // if (!configuredProvider)
        //   $logger.warning(
        //     'Missing email provider - you wont be able to send emails. Options include: AwsSmtp, AwsApi'
        //   );
        // else $logger.info('Loaded emails provider: %s', email.provider);
        console.log('🚀 ~ file: index.ts:24 ~ return$hosting.then ~ email', email);
        // return configuredProvider ? configuredProvider(context) : Fake(context);
    });
};
exports.Email = Email;
//# sourceMappingURL=index.js.map