'use strict';

/**
 * A set of functions called "actions" for `user-management`
 */

module.exports = {
  doesUserExist: async (ctx, next) => {
    try {
      const { username } = ctx.params
      const users = await strapi.entityService.findMany(
        'plugin::users-permissions.user',
        {
          filters: {
            username: username
          }
        }
      );
      ctx.body = users.length !== 0;
    } catch (err) {
      ctx.body = err;
    }
  },
  doesEmailExist: async (ctx, next) => {
    try {
      const { email } = ctx.params
      const emails = await strapi.entityService.findMany(
        'plugin::users-permissions.user',
        {
          filters: {
            email: email
          }
        }
      );
      ctx.body = emails.length !== 0;
    } catch (err) {
      ctx.body = err;
    }
  }
};
