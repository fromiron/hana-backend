/**
 *  pet-type controller
 */

import {factories} from '@strapi/strapi'


// @ts-ignore
export default factories.createCoreController('api::pet-type.pet-type', ({strapi}) => ({
  //各ペットタイプ別登録数をリターンする
  async count(ctx) {
    const user = await strapi.plugins["users-permissions"].services.jwt.getToken(ctx);
    if (!user) {
      return ctx.badRequest(null, [
        {message: "No authorization header was found"},
      ]);
    }
    const knex = strapi.db.connection;
    const data = await knex.select('pt.id', 'pt.type', knex.raw('COUNT(*) as count')).from('pets_type_links as ptl').leftJoin('pet_types as pt', 'ptl.pet_type_id', 'pt.id').groupBy('pt.id');
    return ctx.body = data
  }
}));

