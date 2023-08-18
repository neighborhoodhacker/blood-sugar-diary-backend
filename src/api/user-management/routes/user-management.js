module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/user-management/does-user-exist/:username',
      handler: 'user-management.doesUserExist',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/user-management/does-email-exist/:email',
      handler: 'user-management.doesEmailExist',
      config: {
        auth: false,
      },
    },
  ],
};
