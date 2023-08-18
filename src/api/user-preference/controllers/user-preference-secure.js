'use strict';

/**
 * A set of functions called "actions" for `user-preference-secure`
 */

module.exports = {
	forCurrentUser: async (ctx, next) => {
		try {
			const userPreferences = await strapi.entityService.findMany(
				'api::user-preference.user-preference',
				{
					filters: {
						user: ctx.state.user,
					},
					populate: {
						profilePic: true,
					},
				}
			);
			ctx.body = userPreferences;
		} catch (err) {
			ctx.body = err;
		}
	},
	createForUser: async (ctx, next) => {
		try {
			const doesExist = await strapi.entityService.findMany(
				'api::user-preference.user-preference',
				{
					filters: {
						user: ctx.state.user,
					},
				}
			);
			if (doesExist.length === 0) {
				const userPreferences = await strapi.entityService.create(
					'api::user-preference.user-preference',
					{
						data: {
							publishedAt: new Date(),
							user: ctx.state.user,
						}
					}
				);
				ctx.body = userPreferences;
			} else {
				ctx.body = doesExist;
			}
		} catch (err) {
			ctx.body = err;
		}
	},
	updateForUser: async (ctx, next) => {
		try {
			const existingPreferences = await strapi.entityService.findMany(
				'api::user-preference.user-preference',
				{
					filters: {
						user: ctx.state.user,
					},
				}
			);

			let data = {};

			if (ctx.request.body.profilePic) {
				data['profilePic'] = ctx.request.body.profilePic;
			}

			if (ctx.request.body.diabetesType) {
				data['diabetesType'] = ctx.request.body.diabetesType;
			}

			if (ctx.request.body.birthday) {
				data['birthday'] = ctx.request.body.birthday;
			}

			if (ctx.request.body.startingWeight) {
				data['startingWeight'] = ctx.request.body.startingWeight;
			}

			if (ctx.request.body.startingWeightDate) {
				data['startingWeightDate'] = ctx.request.body.startingWeightDate;
			}

			if (ctx.request.body.targetWeight) {
				data['targetWeight'] = ctx.request.body.targetWeight;
			}

			const userPreferences = await strapi.entityService.update(
				'api::user-preference.user-preference',
				existingPreferences[0].id,
				{
					data: data,
					populate: {
						profilePic: true
					}
				}
			);

			ctx.body = userPreferences;
		} catch (err) {
			ctx.body = err;
		}
	}
}