const router = require("express").Router();

const { request } = require("express");
const db = require("../models");
const Tower = db.towers;
const Op = db.Sequelize.Op;

// To create and save a new tower
router.post("/towers", (req, res) => {
  //Validating if the data exists
  if (!req.body.name) {
    res.status(500).json({
      success: false,
      message: "No content in body of req",
    });
    return;
  }

  // Creating a tower
  const tower = {
    name: req.body.name,
    location: req.body.location,
    floors: req.body.floors,
    offices: req.body.offices,
    rating: req.body.rating,
    latitude: request.body.latitude,
    longitude: request.body.longitude,
  };

  //Saving the tower to the DB
  Tower.create(tower).then((data) => {
    res
      .json({
        success: true,
        tower: data,
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: err.message,
        });
      });
  });
});

// Get all towers (Based on the name if needed)
router.get("/towers", (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Tower.findAll({ where: condition }).then((data) => {
    res
      .json({
        success: true,
        towers: data,
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: err.message,
        });
      });
  });
});

// Get one tower based on id
router.get("/towers/:id", (req, res) => {
  const id = req.params.id;

  Tower.findByPk(id).then((data) =>
    res
      .json({
        success: true,
        tower: data,
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: err.message,
        });
      })
  );
});

// Update tower based on id
router.put("/towers/:id", (req, res) => {
  const id = req.params.id;
  const tower = {};

  if (req.body.name) tower.append((name = req.body.name));
  if (req.body.location) tower.append((location = req.body.location));
  if (req.body.floors) tower.append((floors = req.body.floors));
  if (req.body.offices) tower.append((offices = req.body.offices));
  if (req.body.rating) tower.append((rating = req.body.rating));
  if (req.body.latitude) tower.append((latitude = req.body.latitude));
  if (req.body.longitude) tower.append((longitude = req.body.longitude));

  Tower.update(tower, {
    where: { id: id },
  })
    .then((suc) => {
      if (suc == 1) {
        res.json({
          success: true,
          message: "Tower data was updated successfully",
        });
      } else {
        res.status(500).json({
          success: false,
          message: `There was an error updating the tower info for id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "There was an error updating Tutorial with id=" + id,
      });
    });
});

//Delete particular tower based on id
router.delete("/towers/:id", (req, res) => {
  const id = req.params.id;

  Tower.destroy({
    where: { id: id },
  })
    .then((suc) => {
      if (suc == 1) {
        res.json({
          success: true,
          message: "Tower deleted successfully",
        });
      } else {
        res.status(500).json({
          success: false,
          message: `Tower with id=${id} could not be deleted`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Could not delete tower with id=" + id,
      });
    });
});

module.exports = router;