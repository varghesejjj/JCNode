module.exports = (sequelize, DataTypes) => {
  const Office = sequelize.define("comment", {
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

  return Comment;
};
