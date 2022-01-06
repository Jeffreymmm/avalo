export default [
  {
    path: '/',
    component: '../layouts/index',
    // Routes: ['src/pages/Authorized'],
    // authority: ['user', 'admin'],
    routes: [
      { path: '/', component: './index', title: '登陆' },
      { path: '/chatRoom', component: './components/ChatRoom', title: '聊天室' },
      { path: '/404', component: '404' },
    ],
  },
];
