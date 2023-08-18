'use strict';

/**
 * diary-entry service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::diary-entry.diary-entry');
