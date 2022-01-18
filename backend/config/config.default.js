/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1598932344564_4889';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };


  config.cluster = {
    listen: {
      path: '',
      port: 7002,
      hostname: 'localhost'
    }
  };


  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: ['*']
  }

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  }


  config.mysql = {
    //database configuration
    client: {
      //host
      host: "139.9.223.100",
      //port
      port: "3306",
      //username
      user: "root",
      //password
      password: "szdf1388",
      //database
      database: "boardGame",
    },
    //load into app,default is open //加载到应用程序，默认为打开
    app: true,
    //load into agent,default is close //加载到代理中，默认值为“关闭”
    agent: false,
  };

  config.io = {
    namespace: {
      '/': {
        connectionMiddleware: ['auth'],
        packetMiddleware: ['filter'],
      },
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};