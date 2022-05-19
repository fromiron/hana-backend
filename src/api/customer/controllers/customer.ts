/**
 *  customer controller
 */

import {factories} from '@strapi/strapi'

const CUSTOMER_SEX_TYPES = {
  male: 1,
  female: 2,
  other: 3
}

// @ts-ignore
export default factories.createCoreController('api::customer.customer', ({strapi}) => ({

  async create(ctx) {
    const sex = ctx.request.body.data.sex;
    //性別を指定しない場合、otherに基本設定する。null undefinedにも対応
    if (sex !== CUSTOMER_SEX_TYPES.male && sex !== CUSTOMER_SEX_TYPES.female) {
      ctx.request.body.data.sex = CUSTOMER_SEX_TYPES.other
    }
    return await super.create(ctx);
  },

  async delete(ctx) {
    const {id} = ctx.params;
    return await strapi.db.query("api::customer.customer").update({
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
