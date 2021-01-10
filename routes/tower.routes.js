const router = require("express").Router();

const towers = require("../controllers/tower.controller.js");
const office = require("../controllers/office.controller.js");

const { authJwt } = require("../middleware");

// To create and save a new tower
router.post("/towers", [authJwt.verifyToken], towers.createTower);

//Create new office for tower
router.post("/offices/:id", [authJwt.verifyToken], office.createOffice);

// Get all towers
router.get("/towers", towers.getAll);

// Get one tower based on id
router.get("/towers/:id", towers.getTower);

// Search API
router.get("/towersearch", towers.searchTower);

// Update tower based on id
router.put("/towers/:id", [authJwt.verifyToken], towers.updateTower);

//Delete particular tower based on id
router.delete("/towers/:id", [authJwt.verifyToken], towers.deleteTower);

module.exports = router;
