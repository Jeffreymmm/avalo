import { IConfig } from 'umi-types';
import pageRoutes from './router.config';
import proxy from './proxy';
const { REACT_APP_ENV, USE_TABS, SERVER_ADDRESS,LOGO_TYPE } = process.env;

// ref: https://umijs.org/config/
const config: IConfig = {
  treeShaking: true,
  routes: pageRoutes,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      title: 'umi-dva-antd-mobile',
      dll: true,
      hd: true,
      locale: {
        enable: true,
        default: 'en-US',
      },
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  define: {
    APP_TYPE: process.env.APP_TYPE || '',
  },
  history: 'browser', // 默认是 browser
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  outputPath: './dist',
  hash: true,
  manifest: {
    basePath: '/',
  },
  proxy: proxy[REACT_APP_ENV || 'dev'],
  extraBabelPlugins:[
    ['import', { libraryName: 'antd-mobile', style: true }]  //按需加载antd-mobile样式文件
  ],
};

export default config;
