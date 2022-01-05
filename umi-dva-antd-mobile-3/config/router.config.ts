export default [
  {
    path: '/',
    component: '../layouts/index',
    // Routes: ['src/pages/Authorized'],
    // authority: ['user', 'admin'],
    routes: [
      { path: '/', component: './index', title: '登陆' },
      // { path: '/home', component: './Home/index', title: '首页' },
      { path: '/404', component: '404' },
    ],
  },
];
