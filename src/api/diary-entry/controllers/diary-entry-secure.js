'use strict';

/**
 * A set of functions called "actions" for `diary-entry-secure`
 */

module.exports = {
  forCurrentUser: async (ctx, next) => {
    try {
      let filters = {
        user: ctx.state.user
      };

      if (ctx.request.query.startDate) {
        filters["date"] = { ...filters["date"], $gt: new Date(ctx.request.query.startDate) };
      }

      if (ctx.request.query.endDate) {
        filters["date"] = { ...filters["date"], $lt: new Date(ctx.request.query.endDate) };
      }

      if (ctx.request.query.minBloodSugar) {
        filters["bloodSugar"] = { ...filters["bloodSugar"], $gte: ctx.request.query.minBloodSugar };
      }

      if (ctx.request.query.maxBloodSugar) {
        filters["bloodSugar"] = { ...filters["bloodSugar"], $lte: ctx.request.query.maxBloodSugar };
      }

      if (ctx.request.query.foodConsumedContains) {
        let foodConsumed = ctx.request.query.foodConsumedContains.split(' ');
        filters["$and"] = [];
        for (let i = 0; i < foodConsumed.length; i++) {
          filters["$and"].push({ foodConsumed: { $containsi: foodConsumed[i] } });
        }
      }

      if (ctx.request.query.notesContains) {
        let notes = ctx.request.query.notesContains.split(' ');
        filters["$and"] = [];
        for (let i = 0; i < notes.length; i++) {
          filters["$and"].push({ notes: { $containsi: notes[i] } });
        }
      }

      const diaryEntries = await strapi.entityService.findMany(
        'api::diary-entry.diary-entry',
        {
          filters: filters,
          limit: ctx.params.limit,
          sort: [
            {
              date: 'desc'
            }, {
              id: 'desc'
            }
          ],
          start: (ctx.params.start - 1) * ctx.params.limit,
        }
      );
      ctx.body = diaryEntries;
    } catch (err) {
      ctx.body = err;
    }
  },
  forCurrentUserCount: async (ctx, next) => {
    try {
      let filters = {
        user: ctx.state.user
      }

      if (ctx.request.query.startDate) {
        filters["date"] = { ...filters["date"], $gt: new Date(ctx.request.query.startDate) }
      }

      if (ctx.request.query.endDate) {
        filters["date"] = { ...filters["date"], $lt: new Date(ctx.request.query.endDate) }
      }

      if (ctx.request.query.minBloodSugar) {
        filters["bloodSugar"] = { ...filters["bloodSugar"], $gte: ctx.request.query.minBloodSugar }
      }

      if (ctx.request.query.maxBloodSugar) {
        filters["bloodSugar"] = { ...filters["bloodSugar"], $lte: ctx.request.query.maxBloodSugar }
      }

      if (ctx.request.query.foodConsumedContains) {
        let foodConsumed = ctx.request.query.foodConsumedContains.split(' ');
        filters["$and"] = [];
        for (let i = 0; i < foodConsumed.length; i++) {
          filters["$and"].push({ foodConsumed: { $containsi: foodConsumed[i] } });
        }
      }

      if (ctx.request.query.notesContains) {
        let notes = ctx.request.query.notesContains.split(' ');
        filters["$and"] = [];
        for (let i = 0; i < notes.length; i++) {
          filters["$and"].push({ notes: { $containsi: notes[i] } });
        }
      }

      const diaryEntries = await strapi.entityService.findMany(
        'api::diary-entry.diary-entry',
        {
          filters: filters,
        }
      );
      ctx.body = diaryEntries.length;
    } catch (err) {
      ctx.body = err;
    }
  },
  createForUser: async (ctx, next) => {
    try {
      let data = {
        date: ctx.request.body.date,
        bloodSugar: ctx.request.body.bloodSugar,
        notes: ctx.request.body.notes,
        weight: ctx.request.body.weight,
        beforeAfter: ctx.request.body.beforeAfter,
        foodConsumed: ctx.request.body.foodConsumed,
        carbIntake: ctx.request.body.carbIntake,
        user: ctx.state.user,
        publishedAt: new Date(),
      }

      if (ctx.request.body.data.feel) {
        data['feel'] = ctx.request.body.feel;
      }

      const diaryEntries = await strapi.entityService.create(
        'api::diary-entry.diary-entry',
        {
          data: data
        }
      );
      ctx.body = "Successfully created";
    } catch (err) {
      ctx.body = err;
    }
  },
  deleteForUser: async (ctx, next) => {
    try {
      const user = await strapi.entityService.findOne(
        'api::diary-entry.diary-entry',
        ctx.params.id,
        {
          populate: {
            user: true
          }
        }
      );
      if (user.user.id == ctx.state.user.id) {
        const diaryEntry = await strapi.entityService.delete(
          'api::diary-entry.diary-entry', ctx.params.id
        );
      }
      ctx.body = "Successfully deleted";
    } catch (err) {
      ctx.body = err;
    }
  },
  getChartData: async (ctx, next) => {
    try {
      let filters = {};

      if (ctx.request.query.startDate) {
        filters['date'] = { ...filters['date'], $gte: (new Date(ctx.request.query.startDate)) }
      } else {
        let currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 14);
        let twoWeeksAgo = currentDate;
        filters['date'] = { ...filters['date'], $gte: twoWeeksAgo }
      }

      if (ctx.request.query.endDate) {
        filters['date'] = { ...filters['date'], $lte: (new Date(ctx.request.query.endDate)) }
      }

      const chartData = await strapi.entityService.findMany(
        'api::diary-entry.diary-entry',
        {
          filters: filters,
          fields: ['bloodSugar', 'weight', 'date', 'beforeAfter', 'feel'],
          sort: ['date', 'id'],
        }
      );
      ctx.body = chartData;
    } catch (err) {
      ctx.body = err;
    }
  },
}