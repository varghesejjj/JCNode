module.exports = (sequelize, Sequelize) => {
    const Towers = sequelize.define("towers", {
      name: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      floors: {
        type: Sequelize.INTEGER
      },
      offices: {
        type: Sequelize.INTEGER
      },
      rating: {
        type: Sequelize.FLOAT
      }, // Will be an Integer array. The rating displayed would be the average of the ratings
      latitude: {
        type: Sequelize.FLOAT
      },
      longitude: {
        type: Sequelize.FLOAT
      }
    });
  
    return Towers;
  };