import { ContextType } from '../Context';

const AwsSmtp = require('./AwsSmtp');
const Fake = require('./Fake');

export type EmailContrustor = (context: ContextType) => any;
// module.exports = context => {

export const Email: EmailContrustor = context => {
  const { $logger, $hosting } = context;

  const providers = { AwsSmtp, Fake } as any; // AwsApi comming soon

  return $hosting.then(({ email }) => {
    const configuredProvider = providers[email.provider || 'Fake'];
    if (!configuredProvider)
      $logger.warning(
        'Missing email provider - you wont be able to send emails. Options include: AwsSmtp, AwsApi'
      );
    else $logger.info('Loaded emails provider: %s', email.provider);

    return configuredProvider ? configuredProvider(context) : Fake(context);
  });
};
