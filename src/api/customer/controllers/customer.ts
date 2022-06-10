/**
 *  customer controller
 */

import {factories} from '@strapi/strapi'
import {StrapiInterface} from "../../../../interface/strapiKnex";


export default factories.createCoreController('api::customer.customer', ({strapi}:{strapi:StrapiInterface}) => ({

  async create(ctx) {
    //性別を指定しない場合、otherに基本設定する。null undefinedにも対応
    ctx.request.body.data.sex = ctx.request.body.data.sex ?? 3;
    return await super.create(ctx);
  },

  async delete(ctx) {
    const {id} = ctx.params;
    return await strapi.api.query("api::customer.customer").update({
      where: {
        id: id,
      },
      data: {
        deleted_at: new Date()
      },
    });
  },

  async ageGroup(ctx){
    const user = await strapi.plugins["users-permissions"].services.jwt.getToken(ctx);
    if (!user) {
      return ctx.badRequest(null, [
        {message: "No authorization header was found"},
      ]);
    }
    const knex = strapi.db.connection;
    const data = await knex.select('ag.group', 'cagl.age_group_id', knex.raw('COUNT(*) as count')).from('customers_age_group_links as cagl').leftJoin('age_groups as ag', 'cagl.age_group_id', 'ag.id').groupBy('cagl.age_group_id');
    return ctx.body = data
  }
}))
