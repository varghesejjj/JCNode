"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Towers",
      [
        {
          name: "First Tower",
          location: "location1",
          floors: 9,
          numberofoffices: 0,
          rating: 3.8,
          latitude: 24.788,
          longitude: 67.433,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Second Tower",
          location: "location2",
          floors: 19,
          numberofoffices: 1,
          rating: 4.2,
          latitude: 20.788,
          longitude: 62.433,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Third Tower",
          location: "location3",
          floors: 20,
          numberofoffices: 2,
          rating: 2.4,
          latitude: 21.788,
          longitude: 50.433,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Forth Tower",
          location: "location4",
          floors: 30,
          numberofoffices: 2,
          rating: 4.2,
          latitude: 9.788,
          longitude: 66.433,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Fifth Tower",
          location: "location5",
          floors: 50,
          numberofoffices: 0,
          rating: 4.5,
          latitude: 27.788,
          longitude: 61.433,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Towers", [
      {
        name: [
          "First Tower",
          "Second Tower",
          "Third Tower",
          "Forth Tower",
          "Fifth Tower",
        ],
      },
    ]);
  },
};
