/**
 *  pet controller
 */

import { factories } from '@strapi/strapi'

// @ts-ignore
export default factories.createCoreController('api::pet.pet', ({strapi}) => ({
  //生きているペットと死んだペットの数をリターン
  async count(ctx) {
    const user = await strapi.plugins["users-permissions"].services.jwt.getToken(ctx);
    if (!user) {
      return ctx.badRequest(null, [
        {message: "No authorization header was found"},
      ]);
    }
    const knex = strapi.db.connection;
    const data = await knex.select('dead', knex.raw('COUNT(*) as count')).from('pets').groupBy('dead');
    return ctx.body = data
  }
}));

