'use strict';

/**
 * user-preference service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::user-preference.user-preference');
