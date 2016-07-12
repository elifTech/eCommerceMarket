let appName = 'base';

let module = angular.module(appName, []);

import routes from './routes';

module.config(routes);

export default appName;