const router = require('express-promise-json-router')();
const Image = require('./routers/imageRouter');
const File = require('./routers/fileRouter');
const Context = require('./context');
const callModule = require('./modules/callModule');
// const ObjectRestMethods = require('./routers/ObjectRestMethods');
// const callHandler = require('./modules/callHandler');
const seoRouter = require('./routers/seoRouter');

module.exports = options => {
  options = options || {};
  options.apiPrefix = options.apiPrefix || 'api';
  options.disablePublishing = options.disablePublishing || false;

  return Context(options).then(context => {
    context.whpptOptions = options;

    const { $security, $logger } = context;
    // const objectRestMethods = ObjectRestMethods(context);

    /* @deprecated 2.0 */
    // router.get(`/${options.apiPrefix}/obj/:type/checkSlug`, $security.authenticate, objectRestMethods.checkSlug);
    // router.get(`/${options.apiPrefix}/obj/:type`, $security.authenticate, objectRestMethods.list);
    // router.get(`/${options.apiPrefix}/obj/:type/:id`, $security.authenticate, objectRestMethods.get);
    // router.post(`/${options.apiPrefix}/obj/:type`, $security.authenticate, objectRestMethods.post);
    // router.post(`/${options.apiPrefix}/page/:type/load/:slug`, $security.authenticate, objectRestMethods.post);
    // router.delete(`/${options.apiPrefix}/obj/:type/:id`, $security.authenticate, objectRestMethods.del);

    router.get(`/${options.apiPrefix}/:mod/:query`, $security.authenticate, ({ user, params: { mod, query }, query: queryArgs }) => {
      return callModule(context, mod, query, { ...queryArgs, user }).catch(({ status, error }) => {
        $logger.error('Error in route: %s %s %O %O', mod, query, queryArgs, error);
        return { status, error };
      });
    });

    router.post(`/${options.apiPrefix}/:mod/:command`, $security.authenticate, ({ user, params: { mod, command }, body: cmdArgs }) => {
      return callModule(context, mod, command, { ...cmdArgs, user }).catch(({ status, error }) => {
        $logger.error('Error in route: %s %s %O %O', mod, command, cmdArgs, error);
        return { status, error };
      });
    });

    return Promise.all([Image(context), File(context)]).then(([imageRouter, fileRouter]) => {
      router.use(imageRouter);
      router.use(fileRouter);
      router.use(seoRouter(options));

      return router;
    });
  });
};
