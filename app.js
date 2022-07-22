/**
 *  @Author     :   ruanchuhao
 *  @Date       :   2022/7/22
 *  @Name       :   app.js
 *  @Content    :   ruanchuhao@shgbit.com
 *  @Desc       :
 */

'use strict';
'use strict';

const path = require('path');

module.exports = app => {

    // patch loadRouter
    // load sub routers first
    const loadRouter = app.loader.loadRouter;
    app.loader.loadRouter = function () {
        new app.loader.FileLoader({
            directory: path.join(app.baseDir, 'app/error'),
            target: {},
            inject: app,
            call: true,
        }).load();
        loadRouter.call(app.loader);
    };
    console.log("[DONEDONEDONEDONEDONEDONE]")
}
