"use strict";

const router = require("express").Router(),
  artistRoutes = require("./artistRoutes"),
  errorRoutes = require("./errorRoutes"),
  homeRoutes = require("./homeRoutes"),
  apiRoutes = require("./apiRoutes");

router.use("/api", apiRoutes);
router.use("/artists", artistRoutes);
router.use("/", homeRoutes);
router.use("/", errorRoutes);

module.exports = router;