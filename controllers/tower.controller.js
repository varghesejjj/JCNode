const db = require("../models");
const Tower = db.towers;
const Office = db.office;

const Op = db.Sequelize.Op;

const http = require("http").createServer();
const io = require("socket.io")(http);

// Create a new Tower
exports.createTower = async (req, res) => {
  try {
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
    try {
      let response = await Tower.create(tower);
      if (response) {
        res.json({
          success: true,
          tower: response,
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    io.on("connection", (socket) => {
      socket.on("New Tower Created", (msg) => {
        io.broadcast.emit("Tower Created", msg);
      });
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

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

// To get all towers based on params with pagination
exports.getAll = async (req, res) => {
  try {
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

    try {
      let data = await Tower.findAndCountAll({
        where: condition,
        include: ["Office"],
        limit,
        offset,
        order: [[sortby, sort]],
      });
      if (data) {
        try {
          let response = await getPagingData(data, page, limit);

          if (response) {
            res.json({
              success: true,
              towers: response,
            });
          } else {
            res.status(500).json({
              success: false,
              message: err.message,
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
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get one tower based on id
exports.getTower = async (req, res) => {
  const id = req.params.id;
  try {
    let data = await Tower.findByPk(id, { include: ["Office"] });
    if (data) {
      res.json({
        success: true,
        tower: data,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Search Tower
exports.searchTower = async (req, res) => {
  var search = req.query.search;
  var condition = {
    [Op.or]: [
      { location: { [Op.like]: `%${search}%` } },
      { name: { [Op.like]: `%${search}%` } },
    ],
  };
  try {
    let data = await Tower.findAll({ where: condition, include: ["Office"] });
    if (data) {
      res.json({
        success: true,
        tower: data,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//Update Towers based on id
exports.updateTower = async (req, res) => {
  const id = req.params.id;
  const tower = {};

  if (req.body.name) tower.name = req.body.name;
  if (req.body.location) tower.location = req.body.location;
  if (req.body.floors) tower.floors = req.body.floors;
  if (req.body.rating) tower.rating = req.body.rating;
  if (req.body.latitude) tower.latitude = req.body.latitude;
  if (req.body.longitude) tower.longitude = req.body.longitude;

  try {
    let response = await Tower.update(tower, {
      where: { id: id },
    });
    if (response == 1) {
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
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `There was an error updating the tower info for id=${id}.`,
    });
  }
};

// To delete a tower
exports.deleteTower = async (req, res) => {
  const id = req.params.id;
  try {
    await Office.destroy({ where: { towerId: id } });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.msg,
    });
  }
  try {
    let response = await Tower.destroy({
      where: { id: id },
    });
    if (response == 1) {
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
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.msg,
    });
  }
};
