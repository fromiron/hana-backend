'use strict';

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/pet-types/count",
      handler: "pet-type.count",
      config: {
        auth: false
      }
    },
  ],
};
