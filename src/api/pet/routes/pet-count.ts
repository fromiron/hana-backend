'use strict';

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/pet/count",
      handler: "pet.count",
      config: {
        auth: false
      }
    },
  ],
};
