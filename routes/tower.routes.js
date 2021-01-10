const router = require("express").Router();

const http = require("http").createServer(router);
const io = require("socket.io")(http);

const db = require("../models");
const Tower = db.towers;
const Office = db.office;

const Op = db.Sequelize.Op;

const { authJwt } = require("../middleware");

// To create and save a new tower
router.post("/towers", [authJwt.verifyToken], (req, res) => {
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
    numberofoffices: 0,
    rating: req.body.rating,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
  };

  //Saving the tower to the DB
  Tower.create(tower)
    .then((data) => {
      res.json({
        success: true,
        tower: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    });
  io.on("connection", (socket) => {
    socket.on("New Tower Created", (msg) => {
      io.broadcast.emit("Tower Created", msg);
    });
  });
});

//Create new office for tower
router.post("/offices/:id", [authJwt.verifyToken], (req, res) => {
  const id = req.params.id
  const office = {
    name: req.body.name,
    branch: req.body.branch,
    office_no: req.body.office_no,
    towerId: id,
  };
  Office.create(office)
    .then((data) => {
      Tower.findByPk(id).then((tower) => {  // Updating the number of office of the tower
        if (tower) {
          var upoffices = tower.numberofoffices += 1
          tower.update({
            numberofoffices: upoffices
          })
        }
      }).catch((err) => {
        res.status(500).json({
          success: false,
          message: err.message,
        });
      })
      res.json({
        success: true,
        office: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    });
});

// Helping function to do pagination, set number of pages and the number of items per page
const getPagination = (page, size) => {
  const limit = size ? +size : 3; // default is set to 3 items per page
  const offset = page ? page * limit : 0; // it renders page 0 by default

  return { limit, offset };
};

// Helper function to paginate the data into required pages in the right format
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: towers } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, towers, totalPages, currentPage };
};

// Get all towers (Based on the name if needed)
router.get("/towers", (req, res) => {
  //   const name = req.query.name;

  var {
    page,
    size,
    sort,
    sortby,
    showwithoffices,
    minoffices,
    maxoffices,
    location,
  } = req.query;

  if (!sort) sort = "ASC";
  if (!sortby) sortby = "id";

  const { limit, offset } = getPagination(page, size);

  var condition = {};
  if (showwithoffices) condition.numberofoffices = { [Op.gt]: 0 };
  // Assuming that tower without offices will have number of offices as -1
  if (minoffices && maxoffices)
    condition.numberofoffices = { [Op.between]: [minoffices, maxoffices] };
  if (location) condition.location = { [Op.like]: `%${location}%` };

  Tower.findAndCountAll({
    where: condition,
    include: ["Office"],
    limit,
    offset,
    order: [[sortby, sort]],
  })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.json({
        success: true,
        towers: response,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    });
});

// Get one tower based on id
router.get("/towers/:id", (req, res) => {
  const id = req.params.id;

  Tower.findByPk(id, { include: ["Office"] })
    .then((data) =>
      res.json({
        success: true,
        tower: data,
      })
    )
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    });
});

// Search API
router.get("/towersearch", (req, res) => {
  var search = req.query.search;
  console.log(search);
  var condition = {
    [Op.or]: [
      { location: { [Op.like]: `%${search}%` } },
      { name: { [Op.like]: `%${search}%` } },
    ],
  };

  Tower.findAll({ where: condition, include: ["Office"] })
    .then((data) =>
      res.json({
        success: true,
        tower: data,
      })
    )
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    });
});

// Update tower based on id
router.put("/towers/:id", [authJwt.verifyToken], (req, res) => {
  const id = req.params.id;
  const tower = {};

  if (req.body.name) tower.name = req.body.name;
  if (req.body.location) tower.location = req.body.location;
  if (req.body.floors) tower.floors = req.body.floors;
  if (req.body.rating) tower.rating = req.body.rating;
  if (req.body.latitude) tower.latitude = req.body.latitude;
  if (req.body.longitude) tower.longitude = req.body.longitude;

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
router.delete("/towers/:id", [authJwt.verifyToken], (req, res) => {
  const id = req.params.id;

  Office.destroy({where : {towerId: id}})
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
