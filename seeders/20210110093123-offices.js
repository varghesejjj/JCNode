"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "offices",
      [
        {
          name: "First Office",
          branch: 2,
          office_no: "A123",
          towerId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Second Office",
          branch: 1,
          office_no: "B456",
          towerId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Third Office",
          branch: 2,
          office_no: "C789",
          towerId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Forth Office",
          branch: 3,
          office_no: "D134",
          towerId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Fifth Office",
          branch: 1,
          office_no: "E256",
          towerId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Offices", [
      {
        name: [
          "First Office",
          "Second Office",
          "Third Office",
          "Forth Office",
          "Fifth Office",
        ],
      },
    ]);
  },
};
