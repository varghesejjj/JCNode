"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("roles", [
      {
        id: 1,  
        name: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("roles", [
      {
        name: [
          "user",
        ],
      },
    ]);
  },
};
