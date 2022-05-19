'use strict';

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/customers/age-group",
      handler: "customer.ageGroup",
      config: {
        auth: false
      }
    },
  ],
};
