module.exports = (sequelize, DataTypes) => {
  const Office = sequelize.define("Office", {
    name: {
      type: DataTypes.STRING
    },
    branch: {
      type: DataTypes.INTEGER
    },
    office_no: {
      type: DataTypes.STRING
    }
  });

  return Office;
};
