const db = require("../models");
const Tower = db.towers;
const Office = db.office;

// Creating a new office for a tower with id
exports.createOffice = async (req, res) => {
  const id = req.params.id;
  const office = {
    name: req.body.name,
    branch: req.body.branch,
    office_no: req.body.office_no,
    towerId: id,
  };
  try {
    let response = await Office.create(office);
    if (response) {
      try {
        let tower = await Tower.findByPk(id);
        if (tower) {
          var upoffices = (tower.numberofoffices += 1);
          tower.update({
            numberofoffices: upoffices,
          });
          res.json({
            success: true,
            office: response,
          });
        }
        else {
          res.status(500).json({
            success: false,
            message: "Office Created but tower could not be updated",
          });
        }
      } catch (err) {
        res.status(500).json({
          success: false,
          message: err.message,
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
