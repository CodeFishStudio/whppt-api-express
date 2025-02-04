"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const client_sesv2_1 = require("@aws-sdk/client-sesv2");
const HttpError_1 = require("./HttpError");
const EmailService = ({ $hosting, $logger }) => {
    return $hosting.then(({ email }) => {
        const { region, accessKeyId, secretAccessKey, fromAddress, feedbackAddress } = email;
        if (!region)
            throw new HttpError_1.HttpError(500, 'AWS_REGION is required');
        if (!accessKeyId)
            throw new HttpError_1.HttpError(500, 'AWS_ACCESS_KEYID is required');
        if (!secretAccessKey)
            throw new HttpError_1.HttpError(500, 'AWS_SECRET_ACCESS_KEY is required');
        const clientConfig = {
            region,
            credentials: {
                accessKeyId,
                secretAccessKey,
            },
        };
        $logger.dev('Configuring email client: %o', clientConfig);
        const client = new client_sesv2_1.SESv2Client(clientConfig);
        return {
            send: (email, attachments) => {
                var _a, _b, _c, _d;
                if (!fromAddress)
                    throw new HttpError_1.HttpError(500, 'Cannot send email without a from address. Check env.EMAIL_FROM_ADDRESS');
                if (!feedbackAddress)
                    throw new HttpError_1.HttpError(500, 'Cannot send email without a feedback address. Check env.EMAIL_FEEDBACK_ADDRESS');
                const input = {
                    FromEmailAddress: fromAddress,
                    Destination: {
                        ToAddresses: [email.to],
                        BccAddresses: email.bcc ? email.bcc : [],
                        CcAddresses: email.cc ? email.cc : [],
                    },
                    FeedbackForwardingEmailAddress: feedbackAddress,
                    Content: {
                        Simple: {
                            Subject: { Data: email.subject },
                            Body: { Html: { Data: email.html } },
                        },
                    },
                };
                if (attachments)
                    input.Attachments = attachments;
                $logger.dev('Sending email: %o', input);
                if ((_d = (_c = (_b = (_a = input === null || input === void 0 ? void 0 : input.Content) === null || _a === void 0 ? void 0 : _a.Simple) === null || _b === void 0 ? void 0 : _b.Body) === null || _c === void 0 ? void 0 : _c.Html) === null || _d === void 0 ? void 0 : _d.Data)
                    input.Content.Simple.Body.Html.Data = email.html;
                return client
                    .send(new client_sesv2_1.SendEmailCommand(input))
                    .then(() => $logger.dev('Email sent ok'))
                    .catch((err) => {
                    $logger.warning('Email send fialure', err);
                    throw new HttpError_1.HttpError(500, `Email could not be sent. ${err.message}`);
                });
            },
        };
    });
};
exports.EmailService = EmailService;
//# sourceMappingURL=Email.js.map