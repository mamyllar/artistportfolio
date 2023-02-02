"use strict";

const router = require("express").Router(),
  galleriesController = require("../controllers/galleriesController");

router.get(
  "/galleries",
  galleriesController.index,
  galleriesController.filterArtistGalleries,
  galleriesController.respondJSON
);
router.get("/galleries/:id/join", galleriesController.join, galleriesController.respondJSON);
router.use(galleriesController.errorJSON);

module.exports = router;