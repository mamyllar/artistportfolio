"use strict";

const router = require("express").Router(),
  artistRoutes = require("./artistRoutes"),
  errorRoutes = require("./errorRoutes"),
  homeRoutes = require("./homeRoutes"),
  galleryRoutes = require("./galleryRoutes"),
  apiRoutes = require("./apiRoutes");

router.use("/api", apiRoutes);
router.use("/artists", artistRoutes);
router.use("/galleries", galleryRoutes);
router.use("/", homeRoutes);
router.use("/", errorRoutes);

module.exports = router;